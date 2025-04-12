import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
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
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(8)
  @Matches(/(?=.*[0-9])/, {
    message: 'password must contain at least one number',
  })
  password: string;
}
