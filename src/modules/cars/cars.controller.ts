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
import { Car } from './car.entity';
import { CarsService } from './cars.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly service: CarsService) {}

  @Get()
  @ApiOperation({ summary: 'get all cars in the DB' })
  async findAll() {
    return this.service.all();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Car,
  })
  @ApiOperation({ summary: 'get car by id' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.one(id);
  }

  @Get('/images/all')
  @ApiOperation({ summary: 'Get all cars and their associated images' })
  async getAllCarImages() {
    return this.service.getAllCarImages();
  }

  @Get('/images/:id')
  @ApiOperation({ summary: 'get one car and its associated images' })
  async getCarImages(@Param('id', ParseIntPipe) id: number) {
    return this.service.getCarImages(id);
  }

  @Post('/add')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create 1 car' })
  @UseGuards(BasicGuard)
  async add(@Body(ValidationPipe) input: CarDto) {
    return this.service.add(input);
  }
}
