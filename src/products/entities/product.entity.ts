import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Orderitem } from 'src/orderitems/entities/orderitem.entity';

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

  @OneToMany(() => Orderitem, (orderitem) => orderitem.product)
  orderitems: Orderitem[];
}
