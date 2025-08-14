import {
  IsOptional,
  IsInt,
  IsString,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsInt({ message: 'user_id phải là số nguyên' })
  user_id?: number;

  @IsOptional()
  @IsInt({ message: 'room_id phải là số nguyên' })
  room_id?: number;

  @IsOptional()
  @IsString({ message: 'Nội dung phải là chuỗi' })
  content?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Rating phải là số' })
  @Min(1, { message: 'Đánh giá thấp nhất là 1' })
  @Max(5, { message: 'Đánh giá cao nhất là 5' })
  rating?: number;
}
