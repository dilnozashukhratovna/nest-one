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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Driver')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiOperation({ summary: 'Driver  yaratish' })
  @Post('create')
  async createDriver(@Body() createDriverDto: CreateDriverDto) {
    const driver = this.driverService.createDriver(createDriverDto);
    return driver;
  }

  @ApiOperation({ summary: "Driver'lani  ko'rish" })
  @Get('all')
  async getAllDriver() {
    return this.driverService.getAllDriver();
  }

  @ApiOperation({ summary: "Driver'ni id bo'yicha ko'rish" })
  @Get(':id')
  async getDriverById(@Param('id') id: string) {
    return this.driverService.getDriverById(+id);
  }

  @ApiOperation({ summary: "Driver'ni o'chirish" })
  @Delete(':id')
  async deleteDriverById(@Param('id') id: string) {
    return this.driverService.deleteDriverById(+id);
  }

  @ApiOperation({ summary: "Driver'ni yangilash" })
  @Put(':id')
  async updateDriver(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    return this.driverService.updateDriver(+id, updateDriverDto);
  }
}
