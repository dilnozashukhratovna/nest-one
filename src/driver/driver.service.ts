import { Injectable } from '@nestjs/common';
import { Driver } from './models/driver.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  constructor(@InjectModel(Driver) private driverRepo: typeof Driver) {}

  async createDriver(createDriverDto: CreateDriverDto): Promise<Driver> {
    const driver = await this.driverRepo.create(createDriverDto);
    return driver;
  }

  async getAllDriver(): Promise<Driver[]> {
    const drivers = await this.driverRepo.findAll({ include: { all: true } });
    return drivers;
  }

  async getDriverById(id: number): Promise<Driver> {
    const driver = await this.driverRepo.findByPk(id);
    return driver;
  }

  async deleteDriverById(id: number) {
    const driver = await this.driverRepo.destroy({ where: { id } });
    return driver;
  }

  async updateDriver(id: number, updateDriverDto: UpdateDriverDto) {
    const driver = await this.driverRepo.update(updateDriverDto, {
      where: { id },
      returning: true,
    });

    return driver[1][0].dataValues;
  }
}
