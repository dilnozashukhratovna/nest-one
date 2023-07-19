import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Driver } from 'src/driver/models/driver.model';
import { Machine } from 'src/machine/models/machine.model';

interface MachineAttr {
  machineId: number;
  driverId: number;
}

@Table({ tableName: 'machine_driver' })
export class Machine_driver extends Model<Machine_driver, MachineAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Machine)
  @Column({
    type: DataType.INTEGER,
  })
  machineId: number;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
  })
  driverId: number;
}
