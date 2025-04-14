import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  content: string;

  @IsInt()
  @IsNotEmpty()
  authorId: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;
}
