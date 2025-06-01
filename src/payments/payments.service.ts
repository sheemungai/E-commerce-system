import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment);
  }

  async findAll() {
    const payments = await this.paymentRepository.find();
    return payments;
  }

  async findOne(id: number) {
    const payment = await this.paymentRepository.findOne({
      where: { payment_id: id },
    });
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentRepository.findOne({
      where: { payment_id: id },
    });
    if (!payment) {
      return 'Payment not found';
    }
    return this.paymentRepository.update(id, updatePaymentDto);
  }

  async remove(id: number) {
    const payment = await this.paymentRepository.findOne({
      where: { payment_id: id },
    });
    if (!payment) {
      return 'Payment not found';
    }
    return this.paymentRepository.delete(id);
  }
}
