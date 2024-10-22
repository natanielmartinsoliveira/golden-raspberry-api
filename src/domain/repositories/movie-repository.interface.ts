import { Movie } from '../models/movie.entity';

export interface MovieRepository {
  findWinners(): Promise<Movie[]>;
  findAll(): Promise<Movie[]>;
  save(movies: Movie[]): Promise<void>; 
}
