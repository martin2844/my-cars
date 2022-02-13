import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CarsModule } from './modules/cars/cars.module';
import { ImagesModule } from './modules/images/image.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import ormConfig from './config/orm.config';
import ormProdConfig from './config/ormProd.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV !== 'prod' ? ormConfig : ormProdConfig,
    }),
    CarsModule,
    ImagesModule,
    RouterModule.register([
      {
        path: 'api',
        module: CarsModule,
      },
      {
        path: 'api',
        module: ImagesModule,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', process.env.DB_NAME),
      serveRoot: `/db/${process.env.DB_NAME}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './src/views/styles.css'),
      serveRoot: '/styles.css',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
