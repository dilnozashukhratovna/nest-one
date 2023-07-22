import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Builder } from 'src/builder/models/builder.model';
import { Machine } from 'src/machine/models/machine.model';
import { ApiProperty } from '@nestjs/swagger';


interface CompanyAttr {
  name: string;
  address: string;
  phone: string;
}

@Table({ tableName: 'company' })
export class Company extends Model<Company, CompanyAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Nest-one", description: 'Company nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @ApiProperty({ example: "Tashkent", description: 'Company address' })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({ example: "+998-77-777-77-77", description: 'Company phone number' })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @HasMany(() => Builder)
  builders: Builder[];

  @HasMany(() => Machine)
  machines: Machine[];
}
