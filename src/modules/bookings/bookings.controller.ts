import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ProtectGuard } from '../auth/guards/protect.guard';

@ApiTags('Bookings')
@ApiBearerAuth()
@UseGuards(ProtectGuard)
@Controller('dat-phong')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả đặt phòng' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  getAll() {
    return this.bookingsService.getAllBookings();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết đặt phòng theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy đặt phòng' })
  getById(@Param('id') id: string) {
    return this.bookingsService.getBookingById(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo đặt phòng mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  create(@Body() dto: CreateBookingDto) {
    return this.bookingsService.createBooking(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá đặt phòng theo ID' })
  @ApiResponse({ status: 200, description: 'Xoá thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy đặt phòng' })
  remove(@Param('id') id: string) {
    return this.bookingsService.deleteBooking(+id);
  }
}
