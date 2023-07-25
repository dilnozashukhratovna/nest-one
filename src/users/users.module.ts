import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models/users.model';
import { UserRoles } from 'src/roles/models/user-roles.model';
import { Role } from 'src/roles/models/roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/posts/models/post.model';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, UserRoles, Post]), RolesModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
