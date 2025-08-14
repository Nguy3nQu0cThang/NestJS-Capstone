import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  guests?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  bed_room?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  bath_room?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsBoolean()
  elevator?: boolean;

  @IsOptional()
  @IsBoolean()
  hot_tub?: boolean;

  @IsOptional()
  @IsBoolean()
  pool?: boolean;

  @IsOptional()
  @IsBoolean()
  indoor_fireplace?: boolean;

  @IsOptional()
  @IsBoolean()
  dryer?: boolean;

  @IsOptional()
  @IsBoolean()
  gym?: boolean;

  @IsOptional()
  @IsBoolean()
  kitchen?: boolean;

  @IsOptional()
  @IsBoolean()
  wifi?: boolean;

  @IsOptional()
  @IsBoolean()
  heating?: boolean;

  @IsOptional()
  @IsBoolean()
  cable_tv?: boolean;

  @IsOptional()
  @IsNumber()
  location_id?: number;
}
