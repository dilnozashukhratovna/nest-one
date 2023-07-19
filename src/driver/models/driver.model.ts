import { Table, Model, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { Machine } from 'src/machine/models/machine.model';
import { Machine_driver } from 'src/machine_driver/models/machine_driver.model';

interface DriverAttr {
  first_name: string;
  last_name: string;
}

@Table({ tableName: 'driver' })
export class Driver extends Model<Driver, DriverAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @BelongsToMany(()=>Machine, ()=>Machine_driver)
  machines:Machine[]
}
