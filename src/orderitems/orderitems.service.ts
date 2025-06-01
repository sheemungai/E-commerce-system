import { Injectable } from '@nestjs/common';
import { CreateOrderitemDto } from './dto/create-orderitem.dto';
import { UpdateOrderitemDto } from './dto/update-orderitem.dto';
import { Orderitem } from './entities/orderitem.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderitemsService {
  constructor(
    @InjectRepository(Orderitem)
    private orderitemRepository: Repository<Orderitem>,
  ) {}
  async create(createOrderitemDto: CreateOrderitemDto) {
    const orderitem = this.orderitemRepository.create(createOrderitemDto);
    return this.orderitemRepository.save(orderitem);
  }

  async findAll() {
    const orderitems = await this.orderitemRepository.find();
    if (orderitems.length === 0) {
      return 'No orderitems found';
    }
    return orderitems;
  }

  async findOne(id: number) {
    const orderitem = await this.orderitemRepository.findOne({
      where: { orderitems_id: id },
    });
    if (!orderitem) {
      return 'Orderitem not found';
    }
    return orderitem;
  }

  async update(id: number, updateOrderitemDto: UpdateOrderitemDto) {
    const orderitem = await this.orderitemRepository.findOne({
      where: { orderitems_id: id },
    });
    if (!orderitem) {
      return 'Orderitem not found';
    }
    return this.orderitemRepository.update(id, updateOrderitemDto);
  }

  async remove(id: number) {
    const orderitem = await this.orderitemRepository.findOne({
      where: { orderitems_id: id },
    });
    if (!orderitem) {
      return 'Orderitem not found';
    }
    return this.orderitemRepository.delete(id);
  }
}
