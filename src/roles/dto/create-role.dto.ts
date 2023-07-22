import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'ADMIN', description: 'User roli' })
  value: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'ADMIN role',
    description: 'User roliga explanation',
  })
  description: string;
}
