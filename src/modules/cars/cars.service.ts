import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
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
    const rawQuery = await this.repository.query(
      `SELECT *, car.id, car.createdAt FROM car LEFT JOIN image ON car.id = image.car_id WHERE car.id = ${id}`,
    );
    if (rawQuery.length < 1) {
      throw new NotFoundException();
    }
    const images = rawQuery.map((q) => q.url);
    delete rawQuery[0].url;
    delete rawQuery[0].car_id;
    return {
      ...rawQuery[0],
      images,
    };
  }

  //Just to test a raw query
  async getAllCarImages() {
    const rawQuery = await this.repository.query(
      `SELECT *, car.id, car.createdAt FROM car JOIN image ON car.id = image.car_id`,
    );
    // console.log(rawQuery)
    if (rawQuery.length < 1) {
      throw new NotFoundException();
    }
    let carsIds = [];
    const cars = rawQuery.filter((data) => {
      if (!carsIds.includes(data.car_id)) {
        carsIds.push(data.car_id);
        return data;
      }
    });
    const carsWithImages = cars.map((car) => {
      const images = rawQuery.map((raw) => {
        if (raw.car_id === car.id) {
          return raw.url;
        }
      });
      delete car.url;
      return {
        ...car,
        bought: dayjs(car.bought).format('DD/MM/YYYY'),
        sold: dayjs(car.sold).format('DD/MM/YYYY'),
        images: images.filter((i) => {
          if (i) return i;
        }),
      };
    });

    return carsWithImages;
  }

  async one(id) {
    return this.repository.findOne(id);
  }

  async add(input: CarDto) {
    return this.repository.save({
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
}
