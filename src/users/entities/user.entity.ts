import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  created_at: Date;
  @Column()
  update_at: Date;
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
