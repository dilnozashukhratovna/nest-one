import { ApiProperty } from '@nestjs/swagger';

export class CreateMachineDto {
  @ApiProperty({ example: 'Machine', description: 'Machine nomi' })
  name: string;
  @ApiProperty({ example: 1, description: 'Company Id' })
  companyId: number;
}
