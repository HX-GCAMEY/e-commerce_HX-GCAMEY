import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerMiddleware = new LoggerMiddleware();

  app.use(loggerMiddleware.use);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
