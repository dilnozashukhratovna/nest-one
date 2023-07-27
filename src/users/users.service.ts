import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private readonly roleService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.create(createUserDto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    // const role = await this.roleService.getRoleByValue('ADMIN');

    if (!role) {
      throw new BadRequestException('Role not found');
    }

    // await newUser.$set('roles', [role.id]);
    // await newUser.save();
    // newUser.save();
    newUser.roles = [role];
    return newUser;
  }

  async getAllUsers() {
    const users = await this.userRepo.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return user;
  }

  async deleteUserById(id: number) {
    const user = await this.userRepo.destroy({
      where: { id },
    });
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Foydalanuvchi o'chirildi" };
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const users = await this.userRepo.update(updateUserDto, {
      where: { id },
      returning: true,
    });

    return users[1][0].dataValues;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepo.findByPk(addRoleDto.userId);
    const role = await this.roleService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      await user.$add('role', role.id);
      const updatedUser = await this.userRepo.findByPk(addRoleDto.userId, {
        include: { all: true },
      });
      return updatedUser;
    }

    throw new HttpException(
      'Foydalanuvchi yoki rol topilmadi!',
      HttpStatus.NOT_FOUND,
    );
  }

  async removeRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepo.findByPk(addRoleDto.userId);
    const role = await this.roleService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      await user.$remove('role', role.id);
      const updatedUser = await this.userRepo.findByPk(addRoleDto.userId, {
        include: { all: true },
      });
      return updatedUser;
    }

    throw new HttpException(
      'Foydalanuvchi yoki rol topilmadi!',
      HttpStatus.NOT_FOUND,
    );
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepo.findByPk(activateUserDto.userId);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi!', HttpStatus.NOT_FOUND);
    }
    user.is_active = true;
    await user.save();
    return user;
  }

  async diactivateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepo.findByPk(activateUserDto.userId);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi!', HttpStatus.NOT_FOUND);
    }
    user.is_active = false;
    await user.save();
    return user;
  }
}
