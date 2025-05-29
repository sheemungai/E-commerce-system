import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;
  @Column()
  user_id: number;
  @Column()
  total_amount: number;
  @Column()
  status: string;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
