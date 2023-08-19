import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  //-- setup global prefix --//
  app.setGlobalPrefix('api');

  //-- setup auto validate entity --//
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  //-- setup document by swagger --//
  const configDocumentApi = new DocumentBuilder()
    .setTitle('Document API')
    .setDescription('Detail API')
    .setVersion('0.1')
    .addTag('start API')
    .build();
  const documentApi = SwaggerModule.createDocument(app, configDocumentApi);
  SwaggerModule.setup('api-documents', app, documentApi);

  await app.listen(3000);
}
bootstrap();
