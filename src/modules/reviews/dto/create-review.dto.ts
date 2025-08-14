import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'ID người dùng không được để trống' })
  @IsInt({ message: 'user_id phải là số nguyên' })
  user_id: number;

  @IsNotEmpty({ message: 'ID phòng không được để trống' })
  @IsInt({ message: 'room_id phải là số nguyên' })
  room_id: number;

  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  @IsString({ message: 'Nội dung phải là chuỗi' })
  content: string;

  @IsNotEmpty({ message: 'Đánh giá không được để trống' })
  @IsNumber({}, { message: 'Rating phải là số' })
  @Min(1, { message: 'Đánh giá thấp nhất là 1' })
  @Max(5, { message: 'Đánh giá cao nhất là 5' })
  rating: number;
}
