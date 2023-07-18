import { Table, Model, Column, DataType } from 'sequelize-typescript';

interface BuilderAttr {
  full_name: string;
  birth_day: Date;
  salary: number;
  companyId: number;
}

@Table({ tableName: 'builder' })
export class Builder extends Model<Builder, BuilderAttr> {
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
  full_name: string;
  @Column({
    type: DataType.DATE,
  })
  birth_day: Date;
  @Column({
    type: DataType.DECIMAL,
  })
  salary: number;
  @Column({
    type: DataType.INTEGER,
  })
  companyId: number;
}
