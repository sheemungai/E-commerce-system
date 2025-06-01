import { Module } from '@nestjs/common';
import { OrderitemsService } from './orderitems.service';
import { OrderitemsController } from './orderitems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orderitem } from './entities/orderitem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orderitem])],
  controllers: [OrderitemsController],
  providers: [OrderitemsService],
})
export class OrderitemsModule {}
