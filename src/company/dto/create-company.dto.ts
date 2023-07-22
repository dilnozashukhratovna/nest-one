import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Nest-one', description: 'Company nomi' })
  name: string;
  @ApiProperty({ example: 'Tashkent', description: 'Company address' })
  address: string;
  @ApiProperty({
    example: '+998-77-777-77-77',
    description: 'Company phone number',
  })
  phone: string;
}
