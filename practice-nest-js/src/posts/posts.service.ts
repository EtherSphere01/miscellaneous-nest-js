import { Injectable } from '@nestjs/common';
import { Post } from './post-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dtos/create-post-dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  // Inject the repository for the Post entity

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    let post = this.postsRepository.create(createPostDto);
    post = await this.postsRepository.save(post);
    return post;
  }
}
