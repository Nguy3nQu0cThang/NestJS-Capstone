import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/common/decorator/user.decorator';
import { ProtectGuard } from '../auth/guards/protect.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { Express } from 'express';
import uploadLocal from 'src/common/multer/local.multer';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(ProtectGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(ProtectGuard)
  @Get('me')
  @ApiOperation({ summary: 'Lấy thông tin người dùng hiện tại' })
  async getMe(@User() user: any) {
    return {
      message: 'Lấy thông tin thành công',
      user,
    };
  }

  @UseGuards(ProtectGuard, RoleGuard)
  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả người dùng (Admin)' })
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @UseGuards(ProtectGuard, RoleGuard)
  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Tạo người dùng mới (Admin)' })
  async createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá người dùng theo ID' })
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }

  @Post('upload-avatar')
  @ApiOperation({ summary: 'Upload ảnh đại diện' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @User('id') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Vui lòng chọn file');

    return this.usersService.uploadAvatar(userId, file);
  }
}
