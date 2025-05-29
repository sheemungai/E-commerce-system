import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  img: string;
  @Column()
  category_id: number;
  @Column()
  stock_quantity: number;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;
}
