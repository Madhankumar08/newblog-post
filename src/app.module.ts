import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BlogpostModule } from './blogpost/blogpost.module';

@Module({
  imports: [UsersModule, BlogpostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
