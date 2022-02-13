import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';
import { ImageDto } from './image.dto';
import axios from 'axios';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly repository: Repository<Image>,
  ) {}

  all() {
    return this.repository.find();
  }

  async uploadAndAdd(files: Array<Express.Multer.File>, id: number) {
    let uploadPromises = [];
    let uploadUrls = [];
    Array.from(files).forEach((file) => {
      uploadPromises.push(
        axios
          .post(
            'https://api.imgur.com/3/image',
            {
              image: file.buffer.toString('base64'),
              type: 'base64',
              name: file.originalname,
            },
            {
              headers: {
                Authorization: `Client-ID ${process.env.IMG_ID}`,
              },
            },
          )
          .then((response) => {
            uploadUrls.push(response.data.data.link);
          })
          .catch((error) => {
            console.error('@@@@@@@@@@@ERRROR', error.config);
          }),
      );
    });
    await Promise.all(uploadPromises);
    const images = uploadUrls.map((url) => {
      return {
        car_id: id,
        url: url,
        createdAt: new Date(),
      };
    });
    return this.repository.save(images);
  }

  add(input: ImageDto) {
    return this.repository.save({
      ...input,
      createdAt: new Date().toISOString(),
    });
  }
}
