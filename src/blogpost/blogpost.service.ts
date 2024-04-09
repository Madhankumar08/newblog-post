
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/blogpost.entity';
import { CreateBlogpostDto } from './dto/create-blogpost.dto';
import { UpdateBlogpostDto } from './dto/update-blogpost.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createBlogpostDto: CreateBlogpostDto){
    return await this.postRepository.save(createBlogpostDto);
  }

  async findAll() {
    return await this.postRepository.find();
  }

  async findOne(id:string) {
    return await this.postRepository.findOne({where: { id }})
  }


  async updateAll(id: string, updateBlogpostDto: UpdateBlogpostDto){
   return await this.postRepository.update(id, updateBlogpostDto);
  }

  async updateOne(id: string, updateBlogpostDto: UpdateBlogpostDto){
    const Post = await this.postRepository.findOne({ where: { id } });
    if (updateBlogpostDto.author) Post.author = updateBlogpostDto.author;
    if (updateBlogpostDto.content) Post.content = updateBlogpostDto.content;
    if (updateBlogpostDto.publicationDate) Post.publicationDate = updateBlogpostDto.publicationDate;
    if (updateBlogpostDto.title) Post.title = updateBlogpostDto.title;
    return await this.postRepository.update(id, Post);
   }
  
  async delete(id: number) {
    await this.postRepository.delete(id);
  }
}


