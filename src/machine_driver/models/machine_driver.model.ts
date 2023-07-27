import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';

import { ApiProperty } from '@nestjs/swagger';
import { Machine } from '../../machine/models/machine.model';
import { Driver } from '../../driver/models/driver.model';

interface MachineAttr {
  machineId: number;
  driverId: number;
}

@Table({ tableName: 'machine_driver' })
export class Machine_driver extends Model<Machine_driver, MachineAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Machine)
  @ApiProperty({ example: 1, description: 'Machine Id' })
  @Column({
    type: DataType.INTEGER,
  })
  machineId: number;

  @ForeignKey(() => Driver)
  @ApiProperty({ example: 1, description: 'Driver Id' })
  @Column({
    type: DataType.INTEGER,
  })
  driverId: number;
}
