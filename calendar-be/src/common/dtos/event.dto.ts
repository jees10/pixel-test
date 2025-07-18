import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty({ message: 'Missing required field title' })
  title: string;

  @IsNotEmpty({ message: 'Missing required field description' })
  description: string;

  @IsNotEmpty({ message: 'Missing required field date' })
  date: string;

  @IsNotEmpty({ message: 'Missing required field category' })
  category: string;
}

export class UpdateEventDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  date: string;

  @IsOptional()
  category: string;
}