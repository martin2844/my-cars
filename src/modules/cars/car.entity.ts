import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Image } from '../images/image.entity';
//The first parameter will determine the name of the table
@Entity('car')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  description: string;

  @Column()
  bought: Date;

  @Column()
  sold: Date;

  @Column()
  createdAt: Date;

  @OneToMany(() => Image, image => image.car_id)
  images: Image[]

  @Column()
  updatedAt: Date;
}
