import { Injectable } from '@nestjs/common';
import { Machine } from './models/machine.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Injectable()
export class MachineService {
  constructor(@InjectModel(Machine) private machineRepo: typeof Machine) {}

  async createMachine(createMachineDto: CreateMachineDto): Promise<Machine> {
    const machine = await this.machineRepo.create(createMachineDto);
    return machine;
  }

  async getAllMachine(): Promise<Machine[]> {
    const machines = await this.machineRepo.findAll();
    return machines;
  }

  async getMachineById(id: number): Promise<Machine> {
    const machine = await this.machineRepo.findByPk(id);
    return machine;
  }

  async deleteMachineById(id: number) {
    const machine = await this.machineRepo.destroy({ where: { id } });
    return machine;
  }

  async updateMachine(id: number, updateMachineDto: UpdateMachineDto) {
    const machine = await this.machineRepo.update(updateMachineDto, {
      where: { id },
      returning: true,
    });

    return machine[1][0].dataValues;
  }
}
