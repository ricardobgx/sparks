import { config } from 'dotenv';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  const { PORT } = process.env;

  await app.listen(PORT);
}

bootstrap();
