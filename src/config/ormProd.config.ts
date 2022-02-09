import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Car } from 'src/modules/cars/car.entity';
import { Image } from 'src/modules/images/image.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'sqlite',
    database: process.env.DB_NAME,
    entities: [Car, Image],
    synchronize: false,
  }),
);
