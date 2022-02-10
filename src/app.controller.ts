import { Controller, Get, Render } from '@nestjs/common';
import { CarsService } from './modules/cars/cars.service';
@Controller()
export class AppController {
  constructor(private carService: CarsService) {}

  @Get()
  @Render('Home')
  async getHomePage() {
    const cars = await this.carService.all();
    return { message: 'NestJS ❤ Svelte', cars };
  }
}
