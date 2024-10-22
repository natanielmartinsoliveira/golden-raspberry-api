import { Injectable, Inject } from '@nestjs/common';
import { MovieRepository } from '../../domain/repositories/movie-repository.interface';
import { CsvFileService } from '../../infrastructure/file/csv-file.service';


@Injectable()
export class LoadMoviesFromCsv {
  constructor(
    @Inject('MovieRepository') 
    private readonly movieRepository: MovieRepository,
    private readonly csvFileService: CsvFileService,
  ) {}

  async execute(): Promise<void> {
    const movies = await this.csvFileService.loadCsvData(); 
    await this.movieRepository.save(movies); 
  }
}