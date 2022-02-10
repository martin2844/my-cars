import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BasicGuard } from '../../auth/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageDto } from './image.dto';
import { ImageService } from './image.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly service: ImageService) {}

  @Get()
  async findAll() {
    return this.service.all();
  }

  @Post('upload/:id')
  @UseGuards(BasicGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.uploadAndAdd(files, id);
  }

  @Post('/add')
  @UseGuards(BasicGuard)
  async add(@Body(ValidationPipe) input: ImageDto) {
    return this.service.add(input);
  }
}
