import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.configService.get<string>('ENV_FILE');
    return this.appService.getHello();
  }

  @Get('/test')
  getTest() {
    return process.env;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  getUpload(@UploadedFile() image: Express.Multer.File) {
    console.log(image);
    return image;
  }
}
