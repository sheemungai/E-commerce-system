import { Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { SeedsService } from './seeds.service';

@Controller('seeds')
export class SeedsController {

  private readonly logger = new Logger(SeedsController.name);
  
  constructor(private readonly seedsService: SeedsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  seed(){
    this.logger.log('Seeding the database...');
    return this.seedsService.seed();
  }
}
