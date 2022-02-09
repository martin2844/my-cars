import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Image } from './image.entity';
  import { ImageDto } from './image.dto';

  @Injectable()
  export class ImageService {
    constructor(
      @InjectRepository(Image)
      private readonly repository: Repository<Image>,
    ) {}
  
    all() {
      return this.repository.find();
    }

    uploadAndAdd(){
        
    }
  
    add(input: ImageDto) {
        return this.repository.save({
            ...input,
            createdAt: new Date().toISOString(),
        })
    }

  }
  