import { Table, Model, Column, DataType, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';

import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../company/models/company.model';
import { Driver } from '../../driver/models/driver.model';
import { Machine_driver } from '../../machine_driver/models/machine_driver.model';

interface MachineAttr {
  name: string;
  companyId: number;
}

@Table({ tableName: 'machine' })
export class Machine extends Model<Machine, MachineAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Machine", description: 'Machine nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Company)
  @ApiProperty({ example: 1, description: 'Company Id' })
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @BelongsToMany(() => Driver, () => Machine_driver)
  drivers: Driver[];
}
