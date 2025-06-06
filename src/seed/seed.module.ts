import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Orderitem } from 'src/orderitems/entities/orderitem.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Product,
      Order,
      Orderitem,
      Category,
      Payment,
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
