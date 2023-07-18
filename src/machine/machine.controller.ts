import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post('create')
  async createMachine(@Body() createMachineDto: CreateMachineDto) {
    const machine = this.machineService.createMachine(createMachineDto);
    return machine;
  }

  @Get('all')
  async getAllMachine() {
    return this.machineService.getAllMachine();
  }

  @Get(':id')
  async getMachineById(@Param('id') id: string) {
    return this.machineService.getMachineById(+id);
  }

  @Delete(':id')
  async deleteMachineById(@Param('id') id: string) {
    return this.machineService.deleteMachineById(+id);
  }

  @Put(':id')
  async updateMachine(
    @Param('id') id: string,
    @Body() updateMachineDto: UpdateMachineDto,
  ) {
    return this.machineService.updateMachine(+id, updateMachineDto);
  }
}
