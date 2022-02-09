import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Car } from '../cars/car.entity';

//The first parameter will determine the name of the table
@Entity('image')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  car_id: number;

  @ManyToOne(() => Car, (car) => car.images)
  @JoinColumn({name: "car_id"})
  carId: Car;

  @Column()
  createdAt: Date;

}
