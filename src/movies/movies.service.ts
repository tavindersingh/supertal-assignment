import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.movieRepository.save(createMovieDto);
  }

  async bulkCreate(createMovieDtos: CreateMovieDto[]): Promise<Movie[]> {
    return await this.movieRepository.save(createMovieDtos);
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    return await this.movieRepository.findOne({ where: { id } });
  }
}
