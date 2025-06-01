import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @Column()
  order_id: number;

  @Column()
  amount: number;

  @Column()
  payment_method: string;

  @Column()
  payment_status: string;

  @Column()
  paid_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
