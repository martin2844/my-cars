import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarDto } from './car.dto';
import { Car } from './car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly repository: Repository<Car>,
  ) {}

  async all() {
    return this.repository.find();
  }
  //Just to test a raw query
  async getCarImages(id) {
      const rawQuery = await this.repository.query(`SELECT *, car.id, car.createdAt FROM car LEFT JOIN image ON car.id = image.car_id WHERE car.id = ${id}`);
      if(rawQuery.length < 1) {
        throw new NotFoundException()
      }
      const images = rawQuery.map(q => q.url);
      delete rawQuery[0].url;
      delete rawQuery[0].car_id;
      return {
          ...rawQuery[0],
          images
      }
  }

  async one(id) {
    return this.repository.findOne(id)
  }

  async add(input: CarDto) {
      return this.repository.save({
          ...input,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
      })
  }

}
