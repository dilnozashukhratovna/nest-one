import { Table, Model, Column, DataType, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { Company } from 'src/company/models/company.model';
import { Driver } from 'src/driver/models/driver.model';
import { Machine_driver } from 'src/machine_driver/models/machine_driver.model';

interface MachineAttr {
  name: string;
  companyId: number;
}

@Table({ tableName: 'machine' })
export class Machine extends Model<Machine, MachineAttr> {
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
  name: string;

  @ForeignKey(() => Company)
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
