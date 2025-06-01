import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderitems)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderitems)
  product: Product;
}
