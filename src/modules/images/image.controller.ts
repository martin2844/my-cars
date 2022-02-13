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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasicGuard } from '../../auth/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageDto } from './image.dto';
import { ImageService } from './image.service';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly service: ImageService) {}

  @Get()
  @ApiOperation({ summary: 'get all images in the DB' })
  async findAll() {
    return this.service.all();
  }

  @Post('upload/:id')
  @ApiOperation({
    summary: 'upload an image associated to a Car_id as the route param id',
  })
  @ApiBearerAuth()
  @UseGuards(BasicGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.uploadAndAdd(files, id);
  }

  @Post('/add')
  @ApiOperation({
    summary: 'add an image, requires the image allready uploaded',
  })
  @UseGuards(BasicGuard)
  async add(@Body(ValidationPipe) input: ImageDto) {
    return this.service.add(input);
  }
}
