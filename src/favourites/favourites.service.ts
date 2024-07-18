import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { QueryFavouriteDto } from './dto/query-favourite.dto';
import { Favourite } from './entities/favourite.entity';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(Favourite)
    private readonly favouriteRepository: Repository<Favourite>,
  ) {}

  addToFavourites(createFavouriteDto: CreateFavouriteDto): Promise<Favourite> {
    return this.favouriteRepository.save(createFavouriteDto);
  }

  async bulkCreate(
    createFavouriteDtos: CreateFavouriteDto[],
  ): Promise<Favourite[]> {
    return this.favouriteRepository.save(createFavouriteDtos);
  }

  async findAll(
    queryFavouriteDto: Partial<QueryFavouriteDto>,
  ): Promise<Favourite[]> {
    return await this.favouriteRepository.find({
      where: queryFavouriteDto,
      relations: ['movie'],
    });
  }

  async findOne(queryFavouriteDto: QueryFavouriteDto): Promise<Favourite> {
    return await this.favouriteRepository.findOne({ where: queryFavouriteDto });
  }

  async removeFromFavourite({
    userId,
    movieId,
  }: {
    movieId: number;
    userId: number;
  }) {
    const favourite = await this.findOne({
      movieId,
      userId,
    });

    if (!favourite) {
      throw new Error('Data not found');
    }

    const result = await this.favouriteRepository.remove(favourite);

    return result != null;
  }
}
