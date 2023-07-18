import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post('create')
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    const company = this.companyService.createCompany(createCompanyDto);
    return company;
  }

  @Get('all')
  async getAllCompany() {
    return this.companyService.getAllCompany();
  }

  @Get(':id')
  async getCompanyById(@Param('id') id: string) {
    return this.companyService.getCompanyById(+id);
  }

  @Get('name')
  async getCompanyByName(@Param('name') name: string) {
    return this.companyService.getCompanyByName(name);
  }

  @Delete(':id')
  async deleteCompanyById(@Param('id') id: string) {
    return this.companyService.deleteCompanyById(+id);
  }

  @Put(':id')
  async updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto:UpdateCompanyDto,
  ) {
    return this.companyService.updateCompany(+id, updateCompanyDto);
  }
}


