import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ProtectGuard } from '../auth/guards/protect.guard';

@ApiTags('Reviews')
@ApiBearerAuth()
@UseGuards(ProtectGuard)
@Controller('binh-luan')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả bình luận' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  getAll() {
    return this.reviewsService.getAllReviews();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết bình luận theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bình luận' })
  getById(@Param('id') id: string) {
    return this.reviewsService.getReviewById(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo bình luận mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.createReview(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật bình luận' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bình luận' })
  update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    return this.reviewsService.updateReview(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá bình luận' })
  @ApiResponse({ status: 200, description: 'Xoá thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bình luận' })
  remove(@Param('id') id: string) {
    return this.reviewsService.deleteReview(+id);
  }
}
