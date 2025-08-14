import {
  IsOptional,
  IsString,
  IsDateString,
  IsBoolean,
  IsPhoneNumber,
  IsEmail,
  IsIn,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Tên phải là chuỗi' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @IsOptional()
  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ (VN)' })
  phone?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Ngày sinh không hợp lệ' })
  birthday?: string;

  @IsOptional()
  @IsBoolean({ message: 'Giới tính phải là true hoặc false' })
  gender?: boolean;

  @IsOptional()
  @IsIn(['ADMIN', 'USER'], { message: 'Role phải là ADMIN hoặc USER' })
  role?: string;

  @IsOptional()
  @IsString({ message: 'Avatar phải là chuỗi' })
  avatar?: string;
}
