import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBookings() {
    return this.prisma.bookings.findMany({
      include: {
        users: true,
        rooms: true,
      },
    });
  }

  async getBookingById(id: number) {
    const booking = await this.prisma.bookings.findUnique({
      where: { id },
      include: {
        users: true,
        rooms: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Đặt phòng không tồn tại');
    }

    return booking;
  }

  async createBooking(dto: CreateBookingDto) {
    const { room_id, user_id, check_in, check_out, guests } = dto;

    
    const room = await this.prisma.rooms.findUnique({ where: { id: room_id } });
    if (!room) {
      throw new BadRequestException('Phòng không tồn tại');
    }

    const user = await this.prisma.users.findUnique({ where: { id: user_id } });
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }

    return this.prisma.bookings.create({
      data: {
        room_id: room_id,
        user_id: user_id,
        check_in: new Date(check_in),
        check_out: new Date(check_out),
        guests,
      },
    });
  }

  async deleteBooking(id: number) {
    const booking = await this.prisma.bookings.findUnique({ where: { id } });

    if (!booking) {
      throw new NotFoundException('Đặt phòng không tồn tại');
    }

    return this.prisma.bookings.delete({
      where: { id },
    });
  }
}
