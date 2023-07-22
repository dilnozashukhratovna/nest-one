import { ApiProperty } from '@nestjs/swagger';

export class CreateDriverDto {
  @ApiProperty({ example: 'John', description: 'Driver first name' })
  first_name: string;
  @ApiProperty({ example: 'Green', description: 'Driver last name' })
  last_name: string;
}
