import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('create')
  async createDriver(@Body() createDriverDto: CreateDriverDto) {
    const driver = this.driverService.createDriver(createDriverDto);
    return driver;
  }

  @Get('all')
  async getAllDriver() {
    return this.driverService.getAllDriver();
  }

  @Get(':id')
  async getDriverById(@Param('id') id: string) {
    return this.driverService.getDriverById(+id);
  }

  @Delete(':id')
  async deleteDriverById(@Param('id') id: string) {
    return this.driverService.deleteDriverById(+id);
  }

  @Put(':id')
  async updateDriver(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    return this.driverService.updateDriver(+id, updateDriverDto);
  }
}
