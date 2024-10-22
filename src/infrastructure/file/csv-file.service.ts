import * as fs from 'fs';
import * as path from 'path';
import * as csvParser from 'fast-csv';
import { Injectable } from '@nestjs/common';
import { MovieOrmEntity } from '../persistence/movie.orm-entity';

@Injectable()
export class CsvFileService {
  async loadCsvData(): Promise<MovieOrmEntity[]> {
    const csvFilePath = path.join(__dirname, '..', '..', '..', 'data', 'movielist.csv');
    const movies: MovieOrmEntity[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csvParser.parse({ headers: true, delimiter: ';' }))
        .on('data', (row) => {
          if (Object.keys(row).length === 0) return;

          try {
            const movie = new MovieOrmEntity();
            movie.year = +row['year'];
            movie.title = row['title'];
            movie.studio = row['studios'] || '';
            movie.producer = row['producers'] || '';
            movie.winner = row['winner'] === 'yes';
            movies.push(movie);
          } catch (err) {
            console.error('Error processing row:', row, err);
          }
        })
        .on('end', () => resolve(movies))
        .on('error', (error) => reject(error));
    });
  }
}
