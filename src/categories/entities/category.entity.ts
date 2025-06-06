import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  category_name: string;

  @Column()
  created_at: Date;

  @OneToMany(() => Product, (product) => product.category)
  product: Product[];
}
