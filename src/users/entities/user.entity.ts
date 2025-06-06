import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { UserRole } from '../enums/user-role.enum';

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

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
