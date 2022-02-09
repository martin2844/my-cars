import { Controller, Get, Post, Body, ValidationPipe, Param, ParseIntPipe } from '@nestjs/common';
import { CarDto } from './car.dto';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly service: CarsService) {}

  @Get()
  async findAll() {
    return this.service.all();
  }

  @Get(":id")
  async findOne(@Param('id', ParseIntPipe) id:number) {
    return this.service.one(id);
  }

  
  @Get("/images/:id")
  async getCarImages(@Param('id', ParseIntPipe) id:number) {
    return this.service.getCarImages(id);
  }

  @Post("/add")
  async add(@Body(ValidationPipe) input:CarDto) {
    return this.service.add(input);
  }
}
