import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/users.model';

@ApiTags('Foydalanuvchilar')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Foydalanuvchi yaratish' })
  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchi ko'rish" })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  @Get('all')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Foydalanuvchini id bo'yicha ko'rish" })
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchini o'chirish" })
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(+id);
  }

  @ApiOperation({ summary: 'Foydalanuvchi yangilash' })
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchiga role qo'shish" })
  @HttpCode(200)
  @Post('add_role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchidan rolni olib tashlash' })
  @HttpCode(200)
  @Post('remove_role')
  removeRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.removeRole(addRoleDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchini activate qilish' })
  @HttpCode(200)
  @Post('activate')
  activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.activateUser(activateUserDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchini diactivate qilish' })
  @HttpCode(200)
  @Post('diactivate')
  diactivateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.diactivateUser(activateUserDto);
  }
}
