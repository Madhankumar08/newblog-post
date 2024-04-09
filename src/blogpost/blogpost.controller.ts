// src/blog/blog.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, ValidationPipe, UsePipes, Patch } from '@nestjs/common';
import { CreateBlogpostDto } from './dto/create-blogpost.dto';
import { UpdateBlogpostDto } from './dto/update-blogpost.dto';
import { BlogService } from './blogpost.service';

@Controller('posts')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createBlogpostDto: CreateBlogpostDto) {
    return this.blogService.create(createBlogpostDto);
  }

  @Get()
  findAll(){
    return this.blogService.findAll();
  }

  @Get(':id')
  findOneBy(@Param('id')id : string) {
    return this.blogService.findOne(id);
  }


  @Put(':id')
  updateAll(@Param('id') id: string, @Body() updateBlogpostDto: UpdateBlogpostDto){
    return this.blogService.updateAll(id, updateBlogpostDto);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateBlogpostDto: UpdateBlogpostDto){
    return this.blogService.updateOne(id, updateBlogpostDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    return this.blogService.delete(+id);
  }
}
