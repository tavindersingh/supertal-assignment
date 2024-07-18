import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { QueryCommentDto } from './dto/query_comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @Req() req: Request,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const userId = req.user['sub'];
    createCommentDto.userId = userId;

    return await this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiQuery({ name: 'movieId', required: true })
  findAll(@Query() queryCommentDto: QueryCommentDto) {
    return this.commentsService.findAll(queryCommentDto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const userId = req.user['sub'];

    return this.commentsService.update(id, userId, updateCommentDto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: number) {
    const userId = req.user['sub'];

    return this.commentsService.remove(id, userId);
  }
}
