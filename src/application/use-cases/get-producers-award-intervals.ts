import { Injectable, Inject } from '@nestjs/common';
import { MovieRepository } from '../../domain/repositories/movie-repository.interface';
import { Movie } from '../../domain/models/movie.entity';
import { ProducersWinnerDTO } from '../../presentation/dtos/producers-winner.dto';

@Injectable()
export class GetProducersAwardIntervals {
  constructor(
    @Inject('MovieRepository') 
    private readonly movieRepository: MovieRepository,
  ) {}


  async execute(): Promise<{ min: ProducersWinnerDTO[], max: ProducersWinnerDTO[] }> {
    const winners = await this.movieRepository.findWinners();
  
    const producerList = new Set<string>();

    winners.forEach(movie => {
      const formattedNames = movie.producer.replace(/ and /g, ','); 
      const producers = formattedNames.split(',').map(p => p.trim()); 
      producers.forEach(producer => producerList.add(producer)); 
    });
  
    const producersWinnerDTOList: ProducersWinnerDTO[] = [];
  
    producerList.forEach(producer => {
      const producersSequencialList = this.findWinnerSequencial(producer, winners);
  
      producersSequencialList.forEach(p => {
        if (p.interval > 0 && !this.existsProducersListWinner(producersWinnerDTOList, p)) {
          producersWinnerDTOList.push(p);
        }
      });
    });
  
    return this.getIntervalAwards(producersWinnerDTOList);
  }


  private findIntervalWinProducer(producer: string, winners: Movie[]): { [interval: number]: number[] } {
    
    const producerMovies = winners
      .filter(movie => {
        const formattedNames = movie.producer.replace(/ and /g, ',');
        const producers = formattedNames.split(',').map(p => p.trim()); 
        return producers.includes(producer);
      })
      .sort((a, b) => a.year - b.year);
  
    const yearsMovies = producerMovies.map(movie => movie.year);
  
    const producerInterval: { [interval: number]: number[] } = {};
  
    yearsMovies.reduce((firstYear, secondYear) => {
      const interval = Math.abs(secondYear - firstYear); 
      producerInterval[interval] = [firstYear, secondYear]; 
      return secondYear; 
    });
  
    return producerInterval; 
  }

  private findWinnerSequencial(producer: string, winners: Movie[]): ProducersWinnerDTO[] {
    
    const intervalWinProducer = this.findIntervalWinProducer(producer, winners);
  
    const producersWinnerDTOList: ProducersWinnerDTO[] = [];
  
    Object.keys(intervalWinProducer).forEach((interval) => {
      const years = intervalWinProducer[interval]; 
      const dto = new ProducersWinnerDTO(); 
      dto.producer = producer; 
      dto.interval = +interval; 
      dto.previousWin = years[0]; 
      dto.followingWin = years[1]; 
      producersWinnerDTOList.push(dto); 
    });
  
    return producersWinnerDTOList;
  }

  private existsProducersListWinner(producersWinnerDTOList: ProducersWinnerDTO[], dto: ProducersWinnerDTO): boolean {
    return producersWinnerDTOList.some(v => 
      v.producer === dto.producer && 
      v.previousWin === dto.previousWin && 
      v.followingWin === dto.followingWin
    );
  }


  private getIntervalAwards(producersWinnerDTOList: ProducersWinnerDTO[]): { min: ProducersWinnerDTO[], max: ProducersWinnerDTO[] } {
    const minInterval = Math.min(...producersWinnerDTOList.map(p => p.interval));
    const maxInterval = Math.max(...producersWinnerDTOList.map(p => p.interval));
  
    const minWinners = producersWinnerDTOList.filter(p => p.interval === minInterval);
    const maxWinners = producersWinnerDTOList.filter(p => p.interval === maxInterval);
  
    return { min: minWinners, max: maxWinners };
  }
}