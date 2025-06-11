/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderStatus } from './enums/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const user = await this.userRepository.findOne({
      where: { user_id: createOrderDto.user_id },
    });

    if (!user) {
      throw new NotFoundException(
        `User with id ${createOrderDto.user_id} not found`,
      );
    }

    const order = this.orderRepository.create({
      ...createOrderDto,
      status: OrderStatus.PENDING,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.orderRepository.save(order);
  }

  async findAll() {
    return this.orderRepository.find({
      relations: ['user', 'orderitems', 'payment'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { order_id: id },
      relations: ['user', 'orderitems', 'payment'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({
      where: { order_id: id },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    if (updateOrderDto.user_id) {
      const user = await this.userRepository.findOne({
        where: { user_id: updateOrderDto.user_id },
      });

      if (!user) {
        throw new NotFoundException(
          `User with id ${updateOrderDto.user_id} not found`,
        );
      }
    }

    await this.orderRepository.update(id, {
      ...updateOrderDto,
      status: updateOrderDto.status
        ? OrderStatus[updateOrderDto.status]
        : undefined,
      updated_at: new Date(),
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    const order = await this.orderRepository.findOne({
      where: { order_id: id },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    await this.orderRepository.delete(id);
    return { message: `Order with id ${id} has been deleted` };
  }
}
