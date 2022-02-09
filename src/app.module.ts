import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarsModule } from './modules/cars/cars.module';
import { ImagesModule } from './modules/images/image.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormConfig from './config/orm.config';
import ormProdConfig from './config/ormProd.config';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [ormConfig]
  }),
  TypeOrmModule.forRootAsync({
    useFactory: process.env.NODE_ENV !== "prod" ? ormConfig : ormProdConfig
  }),
  CarsModule,
  ImagesModule

],
})
export class AppModule {}
