import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/users.model';
import { Post } from 'src/posts/models/post.model';
import { FilesModule } from 'src/files/files.module';


@Module({
  imports: [SequelizeModule.forFeature([User, Post]), FilesModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],

})
export class PostsModule {}
