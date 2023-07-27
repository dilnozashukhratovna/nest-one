import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models/users.model';
import { UserRoles } from '../roles/models/user-roles.model';
import { Role } from '../roles/models/roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../posts/models/post.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles, Post]),
    RolesModule,
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
