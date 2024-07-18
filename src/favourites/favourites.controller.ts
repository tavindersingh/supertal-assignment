import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { FavouritesService } from './favourites.service';

@ApiTags('Favourites')
@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('add')
  async create(
    @Req() req: Request,
    @Body() createFavouriteDto: CreateFavouriteDto,
  ) {
    const userId = req.user['sub'];

    createFavouriteDto.userId = userId;
    return await this.favouritesService.addToFavourites(createFavouriteDto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete('movie/:movieId/remove')
  async remove(@Req() req: Request, @Param('movieId') movieId: number) {
    const userId = req.user['sub'];

    return await this.favouritesService.removeFromFavourite({
      movieId,
      userId,
    });
  }
}
