import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({ summary: 'Company  yaratish' })
  @Post('create')
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    const company = this.companyService.createCompany(createCompanyDto);
    return company;
  }

  @ApiOperation({ summary: "Company  ko'rish" })
  @Get('all')
  async getAllCompany() {
    return this.companyService.getAllCompany();
  }

  @ApiOperation({ summary: "Company ni id bo'yicha ko'rish" })
  @Get(':id')
  async getCompanyById(@Param('id') id: string) {
    return this.companyService.getCompanyById(+id);
  }

  // @Get('name')
  // async getCompanyByName(@Param('name') name: string) {
  //   return this.companyService.getCompanyByName(name);
  // }

  @ApiOperation({ summary: "Company ni o'chirish" })
  @Delete(':id')
  async deleteCompanyById(@Param('id') id: string) {
    return this.companyService.deleteCompanyById(+id);
  }

  @ApiOperation({ summary: 'Company  yangilash' })
  @Put(':id')
  async updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.updateCompany(+id, updateCompanyDto);
  }
}
