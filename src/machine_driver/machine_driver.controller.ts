import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Machine_driverService } from './machine_driver.service';
import { CreateMachine_driverDto } from './dto/create-machine_driver.dto';
import { UpdateMachine_driverDto } from './dto/update-machine_driver.dto';

@Controller('machine_driver')
export class Machine_driverController {
  constructor(private readonly machine_driverService: Machine_driverService) {}

  @Post('create')
  async createMachine_driver(
    @Body() createMachine_driverDto: CreateMachine_driverDto,
  ) {
    const machine_driver = this.machine_driverService.createMachine_driver(
      createMachine_driverDto,
    );
    return machine_driver;
  }

  @Get('all')
  async getAllMachine_driver() {
    return this.machine_driverService.getAllMachine_driver();
  }

  @Get(':id')
  async getMachine_driverById(@Param('id') id: string) {
    return this.machine_driverService.getMachine_driverById(+id);
  }

  @Delete(':id')
  async deleteMachine_driverById(@Param('id') id: string) {
    return this.machine_driverService.deleteMachine_driverById(+id);
  }

  @Put(':id')
  async updateMachine_driver(
    @Param('id') id: string,
    @Body() updateMachine_driverDto: UpdateMachine_driverDto,
  ) {
    return this.machine_driverService.updateMachine_driver(
      +id,
      updateMachine_driverDto,
    );
  }
}
