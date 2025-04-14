import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  @Min(1)
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(96)
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(8)
  @MaxLength(96)
  @Matches(/(?=.*[0-9])/, {
    message: 'password must contain at least one number',
  })
  password: string;
}
