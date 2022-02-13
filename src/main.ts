import 'svelte/register';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { svelteTemplateEngine } from './svelte-template-engine';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { resolve, join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.engine('svelte', svelteTemplateEngine);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('svelte');
  app.set('views', resolve('./src/views'));
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('My Cars')
    .setDescription('My Cars App Endpoints')
    .setVersion('1.0')
    .addTag('cars')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(8080);
}
bootstrap();
