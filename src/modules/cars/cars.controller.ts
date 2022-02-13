import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BasicGuard } from 'src/auth/auth.guard';
import { CarDto } from './car.dto';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly service: CarsService) {}

  @Get()
  async findAll() {
    return this.service.all();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.one(id);
  }

  @Get('/images/all')
  async getAllCarImages() {
    return this.service.getAllCarImages();
  }

  @Get('/images/:id')
  async getCarImages(@Param('id', ParseIntPipe) id: number) {
    return this.service.getCarImages(id);
  }

  @Post('/add')
  @UseGuards(BasicGuard)
  async add(@Body(ValidationPipe) input: CarDto) {
    return this.service.add(input);
  }
}
