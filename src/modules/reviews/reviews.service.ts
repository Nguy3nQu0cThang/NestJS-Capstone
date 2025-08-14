import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllReviews() {
    return this.prisma.reviews.findMany({
      include: {
        users: true,
        rooms: true,
      },
    });
  }

  async getReviewById(id: number) {
    const review = await this.prisma.reviews.findUnique({
      where: { id },
      include: {
        users: true,
        rooms: true,
      },
    });

    if (!review) {
      throw new NotFoundException('Bình luận không tồn tại');
    }

    return review;
  }

  async createReview(dto: CreateReviewDto) {
    const { user_id, room_id, content, rating } = dto;

    
    const user = await this.prisma.users.findUnique({ where: { id: user_id } });
    if (!user) throw new BadRequestException('Người dùng không tồn tại');

    const room = await this.prisma.rooms.findUnique({ where: { id: room_id } });
    if (!room) throw new BadRequestException('Phòng không tồn tại');

    return this.prisma.reviews.create({
      data: {
        user_id: user_id,
        room_id: room_id,
        content,
        rating,
      },
    });
  }

  async updateReview(id: number, dto: UpdateReviewDto) {
    const existing = await this.prisma.reviews.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Bình luận không tồn tại');

    return this.prisma.reviews.update({
      where: { id },
      data: {
        user_id: dto.user_id,
        room_id: dto.room_id,
        content: dto.content,
        rating: dto.rating,
      },
    });
  }

  async deleteReview(id: number) {
    const existing = await this.prisma.reviews.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Bình luận không tồn tại');

    return this.prisma.reviews.delete({
      where: { id },
    });
  }
}
