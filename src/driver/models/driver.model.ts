import { Table, Model, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { Machine } from 'src/machine/models/machine.model';
import { Machine_driver } from 'src/machine_driver/models/machine_driver.model';
import { ApiProperty } from '@nestjs/swagger';

interface DriverAttr {
  first_name: string;
  last_name: string;
}

@Table({ tableName: 'driver' })
export class Driver extends Model<Driver, DriverAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "John", description: 'Driver first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: "Green", description: 'Driver last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @BelongsToMany(() => Machine, () => Machine_driver)
  machines: Machine[];
}
