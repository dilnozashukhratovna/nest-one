import { ApiProperty } from '@nestjs/swagger';

export class CreateMachine_driverDto {
  @ApiProperty({ example: 1, description: 'Machine Id' })
  machineId: number;
  @ApiProperty({ example: 1, description: 'Driver Id' })
  driverId: number;
}
