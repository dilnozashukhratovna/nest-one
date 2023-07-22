import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Machine')
@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @ApiOperation({ summary: 'Machine  yaratish' })
  @Post('create')
  async createMachine(@Body() createMachineDto: CreateMachineDto) {
    const machine = this.machineService.createMachine(createMachineDto);
    return machine;
  }

  @ApiOperation({ summary: "Machine'lani  ko'rish" })
  @Get('all')
  async getAllMachine() {
    return this.machineService.getAllMachine();
  }

  @ApiOperation({ summary: "Machine'ni id bo'yicha ko'rish" })
  @Get(':id')
  async getMachineById(@Param('id') id: string) {
    return this.machineService.getMachineById(+id);
  }

  @ApiOperation({ summary: "Machine'ni o'chirish" })
  @Delete(':id')
  async deleteMachineById(@Param('id') id: string) {
    return this.machineService.deleteMachineById(+id);
  }

  @ApiOperation({ summary: "Machine'ni  yangilash" })
  @Put(':id')
  async updateMachine(
    @Param('id') id: string,
    @Body() updateMachineDto: UpdateMachineDto,
  ) {
    return this.machineService.updateMachine(+id, updateMachineDto);
  }
}
