import { Controller, Get, Post, Body, ValidationPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageDto } from './image.dto';
import { ImageService } from './image.service';
import * as FormData from 'form-data'
import axios from 'axios';

@Controller('images')
export class ImagesController {
  constructor(private readonly service: ImageService) {}

  @Get()
  async findAll() {
    return this.service.all();
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    let uploadPromises = [];
    let uploadUrls = [];
  
    Array.from(files).forEach((file) => {
      let imageData = new FormData()
      console.log("IMAGE DATA", imageData)
      console.log(file);
      imageData.append("image", new Blob([file.buffer]));
      console.log(imageData)
      uploadPromises.push(
        axios
          .post("https://api.imgur.com/3/image", imageData, {
            headers: {
              Authorization: "Client-ID afda234326b61af",
            },
          })
          .then((response) => uploadUrls.push(response.data.data.link))
          .catch((error) => console.error("@@@@@@@@@@@ERRROR", error))
      );
    });
    await Promise.all(uploadPromises).then((x) => {
        console.log(x)
      });
  }

  @Post("/add")
  async add(@Body(ValidationPipe) input:ImageDto) {
    return this.service.add(input);
  }
}
