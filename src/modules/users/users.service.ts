import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Express } from 'express';
import { cloudinary } from 'src/common/cloudinary/init.cloudinary';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.users.findMany();
  }

  async getUserById(id: number) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Người dùng không tồn tại');
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async createUser(dto: CreateUserDto) {
    const existing = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new BadRequestException('Email đã tồn tại');

    return this.prisma.users.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: dto.password, 
        phone: dto.phone,
        birthday: dto.birthday,
        gender: dto.gender,
        role: dto.role ?? 'USER',
        avatar: dto.avatar,
      },
    });
  }

  
  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Người dùng không tồn tại');

    return this.prisma.users.update({
      where: { id },
      data: { ...dto },
    });
  }

  async deleteUser(id: number) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Người dùng không tồn tại');

    return this.prisma.users.delete({
      where: { id },
    });
  }

  async uploadAvatar(userId: number, file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File không tồn tại');

    // Upload lên Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'avatars',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      ).end(file.buffer);
    });

    const { secure_url } = uploadResult as any;

    // Lưu URL vào database
    const updatedUser = await this.prisma.users.update({
      where: { id: userId },
      data: {
        avatar: secure_url,
      },
    });

    return {
      message: 'Upload ảnh thành công',
      avatar: secure_url,
      user: updatedUser,
    };
  }

  async uploadAvatarLocal(userId: number, file: Express.Multer.File) {
  if (!file) throw new BadRequestException('File không tồn tại');

  const imageUrl = `/images/${file.filename}`;

  const updatedUser = await this.prisma.users.update({
    where: { id: userId },
    data: {
      avatar: imageUrl,
    },
  });

  return {
    message: 'Upload avatar local thành công',
    avatar: imageUrl,
    user: updatedUser,
  };
}

}
