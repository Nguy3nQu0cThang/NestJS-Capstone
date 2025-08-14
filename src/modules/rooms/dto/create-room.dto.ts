import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty({ message: 'Tên phòng không được để trống' })
  @IsString()
  name: string;

  @IsNumber()
  @Min(1, { message: 'Phòng phải chứa ít nhất 1 khách' })
  guests: number;

  @IsNumber()
  @Min(0)
  bed_room: number;

  @IsNumber()
  @Min(0)
  bath_room: number;

  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsBoolean()
  elevator: boolean;

  @IsBoolean()
  hot_tub: boolean;

  @IsBoolean()
  pool: boolean;

  @IsBoolean()
  indoor_fireplace: boolean;

  @IsBoolean()
  dryer: boolean;

  @IsBoolean()
  gym: boolean;

  @IsBoolean()
  kitchen: boolean;

  @IsBoolean()
  wifi: boolean;

  @IsBoolean()
  heating: boolean;

  @IsBoolean()
  cable_tv: boolean;

  @IsNumber()
  @IsNotEmpty({ message: 'Phòng phải có location_id' })
  location_id: number;

  @IsOptional()
  @IsString({ message: 'Ảnh phải là chuỗi URL' })
  image?: string;
}

