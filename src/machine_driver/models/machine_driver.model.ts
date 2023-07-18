import { Table, Model, Column, DataType } from 'sequelize-typescript';

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
  @Column({
    type: DataType.INTEGER,
  })
  machineId: number;
  @Column({
    type: DataType.INTEGER,
  })
  driverId: number;
}
