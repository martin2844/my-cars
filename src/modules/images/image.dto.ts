import { IsString, IsUrl, IsInt, IsDateString } from 'class-validator';

export class ImageDto {
  //This decorator makes the length minimum 5 characters
  //You can pass optional parameters
  //You can also stack Validation Decorators.
  @IsUrl()
  @IsString()
  url: string;

  @IsInt()
  car_id: number;

  @IsDateString()
  createdAt: Date;
}
