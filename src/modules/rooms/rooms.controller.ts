import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProtectGuard } from '../auth/guards/protect.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@ApiTags('Rooms')
@ApiBearerAuth()
@UseGuards(ProtectGuard)
@Controller('phong-thue')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả phòng' })
  getAllRooms() {
    return this.roomsService.getAllRooms();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin phòng theo ID' })
  getRoomById(@Param('id') id: string) {
    return this.roomsService.getRoomById(+id);
  }

  @Post()
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Tạo phòng mới (Admin)' })
  createRoom(@Body() dto: CreateRoomDto) {
    return this.roomsService.createRoom(dto);
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Cập nhật thông tin phòng (Admin)' })
  updateRoom(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
    return this.roomsService.updateRoom(+id, dto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Xoá phòng theo ID (Admin)' })
  deleteRoom(@Param('id') id: string) {
    return this.roomsService.deleteRoom(+id);
  }

  @Post('upload-hinh-phong')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Upload ảnh đại diện cho phòng (Admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        roomId: { type: 'string', example: '1' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadRoomImage(
    @Body('roomId') roomId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Vui lòng chọn hình');
    return this.roomsService.uploadRoomImage(+roomId, file);
  }
}
