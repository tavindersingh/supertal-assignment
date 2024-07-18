import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  overview: string;

  @Column({ name: 'poster_path' })
  posterPath: string;

  @Column({ name: 'tmdb_id' })
  tmdbId: number;

  @Column({ name: 'release_date' })
  releaseDate: string;

  @Column({ name: 'vote_average' })
  voteAverage: number;

  @Column({ name: 'vote_count' })
  voteCount: number;
}
