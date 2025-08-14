import { IsOptional, IsString } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  @IsString({ message: 'Tên địa điểm phải là chuỗi' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Tỉnh/thành phải là chuỗi' })
  province?: string;

  @IsOptional()
  @IsString({ message: 'Quốc gia phải là chuỗi' })
  country?: string;

  @IsOptional()
  @IsString({ message: 'Value phải là chuỗi' })
  value_text?: string;

  @IsOptional()
  @IsString({ message: 'Image phải là chuỗi (URL)' })
  image?: string;
}
