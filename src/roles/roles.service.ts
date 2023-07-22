import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepo: typeof Role) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const newRole = await this.rolesRepo.create(createRoleDto);
    return newRole;
  }

  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.rolesRepo.findOne({ where: { value } });
    return role;
  }

  async getAllRoles() {
    const roles = await this.rolesRepo.findAll({ include: { all: true } });
    return roles;
  }

  async deleteRoleById(id: number) {
    const role = await this.rolesRepo.destroy({ where: { id } });
    if (!role) {
      throw new HttpException('Role topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Role o'chirildi" };
    return role;
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    const roles = await this.rolesRepo.update(updateRoleDto, {
      where: { id },
      returning: true,
    });

    return roles[1][0].dataValues;
  }
}
