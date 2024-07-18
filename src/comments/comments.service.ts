import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { QueryCommentDto } from './dto/query_comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return await this.commentRepository.save(createCommentDto);
  }

  async bulkCreate(createCommentDtos: CreateCommentDto[]): Promise<Comment[]> {
    return await this.commentRepository.save(createCommentDtos);
  }

  async findAll(queryCommentDto: QueryCommentDto): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: queryCommentDto,
      relations: ['movie', 'user'],
    });
  }

  async findOne(id: number, userId: number): Promise<Comment> {
    return await this.commentRepository.findOne({ where: { id, userId } });
  }

  async update(id: number, userId: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.findOne(id, userId);

    if (!comment) {
      throw new BadRequestException('Comment not found');
    }

    comment.content = updateCommentDto.content;

    return await this.commentRepository.save(comment);
  }

  async remove(id: number, userId: number): Promise<boolean> {
    const comment = await this.findOne(id, userId);

    if (!comment) {
      throw new BadRequestException('Comment not found');
    }

    const result = await this.commentRepository.remove(comment);

    return result != null;
  }
}
