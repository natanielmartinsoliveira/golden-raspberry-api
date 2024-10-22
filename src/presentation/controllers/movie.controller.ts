import { Controller, Get } from '@nestjs/common';
import { GetProducersAwardIntervals } from '../../application/use-cases/get-producers-award-intervals';

@Controller('awards')
export class MovieController {
  constructor(
    private readonly getProducersAwardIntervals: GetProducersAwardIntervals,
  ) {}

  @Get('producers')
  async getProducersIntervals() {
    return this.getProducersAwardIntervals.execute();
  }

}
