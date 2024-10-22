import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieOrmEntity } from './movie.orm-entity';
import { MovieRepository } from '../../domain/repositories/movie-repository.interface';
import { Movie } from '../../domain/models/movie.entity';


@Injectable()
export class MovieRepositoryTypeOrm implements MovieRepository {
  constructor(
    @InjectRepository(MovieOrmEntity) 
    private readonly movieRepository: Repository<MovieOrmEntity>,
  ) {}

  async findWinners(): Promise<Movie[]> {
    const winners = await this.movieRepository.find({ where: { winner: true } });
    return winners.map(entity => new Movie(
      entity.id,
      entity.title,
      entity.year,
      entity.studio,
      entity.producer,
      entity.winner,
    ));
  }

  async findAll(): Promise<Movie[]> {
    const movies = await this.movieRepository.find();
    return movies.map(entity => new Movie(
      entity.id,
      entity.title,
      entity.year,
      entity.studio,
      entity.producer,
      entity.winner,
    ));
  }

  async save(movies: Movie[]): Promise<void> {
    const movieEntities = movies.map(movie => {
      const entity = new MovieOrmEntity();
      entity.id = movie.id;
      entity.title = movie.title;
      entity.year = movie.year;
      entity.studio = movie.studio;
      entity.producer = movie.producer;
      entity.winner = movie.winner;
      return entity;
    });
    await this.movieRepository.save(movieEntities);
  }
}