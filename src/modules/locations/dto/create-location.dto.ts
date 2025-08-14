import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty({ message: 'Tên địa điểm không được để trống' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Tỉnh/thành không được để trống' })
  @IsString()
  province: string;

  @IsNotEmpty({ message: 'Quốc gia không được để trống' })
  @IsString()
  country: string;

  @IsOptional()
  @IsString({ message: 'Value phải là chuỗi' })
  value_text?: string;

  @IsOptional()
  @IsString({ message: 'Image phải là chuỗi (URL)' })
  image?: string;
}
