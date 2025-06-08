import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Orderitem {
  @PrimaryGeneratedColumn()
  orderitems_id: number;

  @Column()
  order_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.orderitems)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderitems)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
