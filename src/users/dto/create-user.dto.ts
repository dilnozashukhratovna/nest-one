import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  @ApiProperty({ example: 'user1', description: 'Foydalanuvchi nomi' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'user1@mail.com',
    description: 'Foydalanuvchi pochtasi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@$$w0rd', description: 'Foydalanuvchi paroli' })
  @IsStrongPassword({ minLength: 6 })
  password: string;
}
