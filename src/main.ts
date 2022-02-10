import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { svelteTemplateEngine } from './svelte-template-engine';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.engine('svelte', svelteTemplateEngine);
  app.setViewEngine('svelte');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}
bootstrap();
