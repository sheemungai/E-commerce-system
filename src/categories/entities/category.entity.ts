import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  category_name: string;

  @Column()
  created_at: Date;

  @OneToOne(() => Product, (product) => product.category)
  product: Product[];
}
