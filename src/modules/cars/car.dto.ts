import { IsString, Length } from 'class-validator';

export class CarDto {
  //This decorator makes the length minimum 5 characters
  //You can pass optional parameters
  //You can also stack Validation Decorators.
  @Length(3, 255, { message: 'The title length is not long enough' })
  @IsString()
  brand: string;
}
