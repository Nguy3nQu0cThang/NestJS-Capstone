import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { cloudinary } from 'src/common/cloudinary/init.cloudinary';
import { Express } from 'express';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllRooms() {
    return this.prisma.rooms.findMany({
      include: { locations: true }, 
    });
  }

  async getRoomById(id: number) {
    const room = await this.prisma.rooms.findUnique({
      where: { id },
      include: { locations: true },
    });

    if (!room) {
      throw new NotFoundException('Phòng không tồn tại');
    }

    return this.prisma.rooms.findUnique({
      where: { id },
      include: {
        room_images: true,
        locations: true,
      },
    });
  }

  async createRoom(dto: CreateRoomDto) {
    return this.prisma.rooms.create({
      data: {
        ...dto,
      },
    });
  }

  async updateRoom(id: number, dto: UpdateRoomDto) {
    const existing = await this.prisma.rooms.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Phòng không tồn tại');
    }

    return this.prisma.rooms.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteRoom(id: number) {
    const existing = await this.prisma.rooms.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Phòng không tồn tại');
    }

    return this.prisma.rooms.delete({ where: { id } });
  }

  async uploadRoomImage(roomId: number, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Không có file được gửi');
    }

    const room = await this.prisma.rooms.findUnique({ where: { id: roomId } });
    if (!room) {
      throw new NotFoundException('Phòng không tồn tại');
    }

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'rooms',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(file.buffer);
    });

    const { secure_url } = uploadResult as any;

    // Lưu hình vào bảng room_images
    const image = await this.prisma.room_images.create({
      data: {
        room_id: roomId,
        image_url: secure_url,
      },
    });

    return {
      message: 'Upload thành công',
      image,
    };
  }
}
