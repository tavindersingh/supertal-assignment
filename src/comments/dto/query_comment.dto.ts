import { ApiProperty } from '@nestjs/swagger';

export class QueryCommentDto {
  @ApiProperty()
  movieId: number;
}
