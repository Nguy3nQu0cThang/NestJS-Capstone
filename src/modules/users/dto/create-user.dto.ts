import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsPhoneNumber,
  IsDateString,
  IsBoolean,
  IsIn,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @IsOptional()
  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
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
