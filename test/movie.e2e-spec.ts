

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieOrmEntity } from '../src/infrastructure/persistence/movie.orm-entity'; // Certifique-se de que o caminho está correto
import { MovieRepositoryTypeOrm } from '../src/infrastructure/persistence/movie-repository.typeorm';
import { MovieController } from '../src/presentation/controllers/movie.controller';
import { CsvFileService } from '../src/infrastructure/file/csv-file.service';
import { LoadMoviesFromCsv } from '../src/application/use-cases/load-movies-from-csv';
import { GetProducersAwardIntervals } from '../src/application/use-cases/get-producers-award-intervals';

describe('MovieController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        // Configuração do banco de dados em memória para os testes
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:', // Banco de dados em memória
          entities: [MovieOrmEntity], // Registra a entidade
          synchronize: true, // Sincroniza as entidades automaticamente
        }),
        TypeOrmModule.forFeature([MovieOrmEntity]), // Entidade disponível no contexto do repositório
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
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/awards/producers (GET)', () => {
    return request(app.getHttpServer())
      .get('/awards/producers')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('min');
        expect(res.body).toHaveProperty('max');

        res.body.min.forEach(item => {
          expect(item).toHaveProperty('producer');
          expect(item).toHaveProperty('interval');
          expect(item).toHaveProperty('previousWin');
          expect(item).toHaveProperty('followingWin');
        });
  
        res.body.max.forEach(item => {
          expect(item).toHaveProperty('producer');
          expect(item).toHaveProperty('interval');
          expect(item).toHaveProperty('previousWin');
          expect(item).toHaveProperty('followingWin');
        });
      });
  });
});

