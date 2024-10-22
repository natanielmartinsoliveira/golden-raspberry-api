import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieOrmEntity } from './infrastructure/persistence/movie.orm-entity'; 
import { MovieRepositoryTypeOrm } from './infrastructure/persistence/movie-repository.typeorm';
import { MovieController } from './presentation/controllers/movie.controller';
import { CsvFileService } from './infrastructure/file/csv-file.service';
import { LoadMoviesFromCsv } from './application/use-cases/load-movies-from-csv';
import { GetProducersAwardIntervals } from './application/use-cases/get-producers-award-intervals';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [MovieOrmEntity], 
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([MovieOrmEntity]), 
  ],
  controllers: [MovieController],
  providers: [
    CsvFileService,
    LoadMoviesFromCsv,
    GetProducersAwardIntervals,
    {
      provide: 'MovieRepository', 
      useClass: MovieRepositoryTypeOrm, 
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly loadMoviesFromCsv: LoadMoviesFromCsv) {}

  async onModuleInit() {
    await this.loadMoviesFromCsv.execute(); 
  }
}
