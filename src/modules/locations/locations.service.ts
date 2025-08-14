import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { cloudinary } from 'src/common/cloudinary/init.cloudinary';
import { Express } from 'express';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllLocations() {
    return this.prisma.locations.findMany();
  }

  async getLocationById(id: number) {
    const location = await this.prisma.locations.findUnique({
      where: { id },
    });
    if (!location) throw new NotFoundException('Địa điểm không tồn tại');
    return location;
  }

  async createLocation(dto: CreateLocationDto) {
    const exists = await this.prisma.locations.findFirst({
      where: {
        name: dto.name,
        province: dto.province,
        country: dto.country,
      },
    });

    if (exists) {
      throw new BadRequestException('Địa điểm đã tồn tại');
    }

    return this.prisma.locations.create({
      data: dto,
    });
  }

  async updateLocation(id: number, dto: UpdateLocationDto) {
    const location = await this.prisma.locations.findUnique({
      where: { id },
    });
    if (!location) throw new NotFoundException('Địa điểm không tồn tại');

    return this.prisma.locations.update({
      where: { id },
      data: dto,
    });
  }

  async deleteLocation(id: number) {
    const location = await this.prisma.locations.findUnique({
      where: { id },
    });
    if (!location) throw new NotFoundException('Địa điểm không tồn tại');

    return this.prisma.locations.delete({ where: { id } });
  }

  async uploadImage(id: number, file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Không có file được gửi');

    // Upload lên Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'locations',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      ).end(file.buffer);
    });

    const { secure_url } = uploadResult as any;

    return this.prisma.locations.update({
      where: { id },
      data: { image: secure_url },
    });
  }
}
