import {
  IsNotEmpty,
  IsInt,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty({ message: 'ID phòng không được để trống' })
  @IsInt({ message: 'ID phòng phải là số nguyên' })
  room_id: number;

  @IsNotEmpty({ message: 'ID người dùng không được để trống' })
  @IsInt({ message: 'ID người dùng phải là số nguyên' })
  user_id: number;

  @IsNotEmpty({ message: 'Ngày check-in không được để trống' })
  @IsDateString({}, { message: 'Ngày check-in không hợp lệ' })
  check_in: string;

  @IsNotEmpty({ message: 'Ngày check-out không được để trống' })
  @IsDateString({}, { message: 'Ngày check-out không hợp lệ' })
  check_out: string;

  @IsNotEmpty({ message: 'Số lượng khách không được để trống' })
  @IsInt()
  @Min(1, { message: 'Phải có ít nhất 1 khách' })
  guests: number;
}
