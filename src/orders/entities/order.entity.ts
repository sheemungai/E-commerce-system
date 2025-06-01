import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Orderitem } from 'src/orderitems/entities/orderitem.entity';
import { OrderStatus } from '../enums/order-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;
  @Column()
  user_id: number;
  @Column()
  total_amount: number;
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => Orderitem, (orderitem) => orderitem.order)
  orderitems: Orderitem[];
}
