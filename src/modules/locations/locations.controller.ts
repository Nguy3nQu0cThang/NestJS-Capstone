import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationsService } from './locations.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProtectGuard } from '../auth/guards/protect.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@ApiTags('Locations')
@ApiBearerAuth()
@UseGuards(ProtectGuard)
@Controller('vi-tri')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách địa điểm' })
  getAllLocations() {
    return this.locationsService.getAllLocations();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết địa điểm theo ID' })
  getLocationById(@Param('id') id: string) {
    return this.locationsService.getLocationById(+id);
  }

  @Post()
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Tạo địa điểm mới (Admin)' })
  createLocation(@Body() dto: CreateLocationDto) {
    return this.locationsService.createLocation(dto);
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Cập nhật địa điểm (Admin)' })
  updateLocation(@Param('id') id: string, @Body() dto: UpdateLocationDto) {
    return this.locationsService.updateLocation(+id, dto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Xoá địa điểm (Admin)' })
  deleteLocation(@Param('id') id: string) {
    return this.locationsService.deleteLocation(+id);
  }

  @Post('upload-hinh-vitri/:id')
  @UseGuards(RoleGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Upload hình cho địa điểm (Admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Vui lòng chọn hình');

    return this.locationsService.uploadImage(+id, file);
  }
}
