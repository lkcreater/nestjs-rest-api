import {
  Injectable,
  Logger as ConsoleLogger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from './entities/logger.entity';
import { Repository } from 'typeorm';
import { interLogger } from 'src/@types';

@Injectable()
export class LoggerService {
  private readonly logger = new ConsoleLogger();
  private enable = false;

  constructor(
    @InjectRepository(Logger)
    private repoLogger: Repository<Logger>,
  ) {}

  async error(error: any, options: interLogger<any>) {
    await this.addLogger(options);
    this.logger.error(error);
  }

  async log<T>(log: any, options: interLogger<T>) {
    await this.addLogger(options);
    this.logger.log(log);
  }

  private async addLogger(options: interLogger<any>) {
    try {
      if (this.enable) {
        const logType = options.type ? options.type : options.origin.path;
        await this.repoLogger.save(<Logger>{
          log_type: logType,
          log_origin: options.origin,
          log_data: options.data,
          log_user: options.user,
        });
      }
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
