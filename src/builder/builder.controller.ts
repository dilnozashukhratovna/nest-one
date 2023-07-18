import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BuilderService } from './builder.service';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';

@Controller('builder')
export class BuilderController {
  constructor(private readonly builderService: BuilderService) {}

  @Post('create')
  async createBuilder(@Body() createBuilderDto: CreateBuilderDto) {
    const builder = this.builderService.createBuilder(createBuilderDto);
    return builder;
  }

  @Get('all')
  async getAllBuilder() {
    return this.builderService.getAllBuilder();
  }

  @Get(':id')
  async getBuilderById(@Param('id') id: string) {
    return this.builderService.getBuilderById(+id);
  }

  @Delete(':id')
  async deleteBuilderById(@Param('id') id: string) {
    return this.builderService.deleteBuilderById(+id);
  }

  @Put(':id')
  async updateBuilder(
    @Param('id') id: string,
    @Body() updateBuilderDto: UpdateBuilderDto,
  ) {
    return this.builderService.updateBuilder(+id, updateBuilderDto);
  }
}
