import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Missing required field name' })
  name: string;

  @IsEmail({}, { message: 'Is not a valid email format' })
  @IsNotEmpty({ message: 'Missing required field email' })
  email: string;

  @MinLength(6, { message: 'Password requires 6 characters' })
  @IsNotEmpty({ message: 'Missing required field password' })
  password: string;
}

export class UpdateUserDto {

  @IsOptional()
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Is not a valid email format' })  
  email: string;

  @IsOptional()
  @MinLength(6, { message: 'Password requires 6 characters' })  
  password: string;
}