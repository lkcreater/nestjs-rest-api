import { Injectable, Logger as ConsoleLogger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from './entities/logger.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerService {
  private readonly logger = new ConsoleLogger();
  constructor(
    @InjectRepository(Logger)
    private repoLogger: Repository<Logger>,
  ) {}

  error(error: any) {
    console.log(this.repoLogger);
    this.logger.error(error);
  }
}
