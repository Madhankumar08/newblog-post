import { Module } from '@nestjs/common';
import { BlogService } from './blogpost.service';
import { BlogController } from './blogpost.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/blogpost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogpostModule {}
