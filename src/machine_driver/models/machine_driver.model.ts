import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Driver } from 'src/driver/models/driver.model';
import { Machine } from 'src/machine/models/machine.model';
import { ApiProperty } from '@nestjs/swagger';

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
