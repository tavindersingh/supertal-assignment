import { ApiProperty } from '@nestjs/swagger';

export class CreateFavouriteDto {
  @ApiProperty()
  movieId: number;

  userId: number;
}
