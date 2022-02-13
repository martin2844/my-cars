import { Controller, Get, Render } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { CarsService } from './modules/cars/cars.service';
ApiExcludeController;

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private carService: CarsService) {}

  @Get()
  @Render('Home')
  async getHomePage() {
    const cars = await this.carService.getAllCarImages();
    return { message: 'NestJS ❤ Svelte', cars };
  }
}
