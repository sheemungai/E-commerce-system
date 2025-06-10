import { Injectable, Logger } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Orderitem } from 'src/orderitems/entities/orderitem.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SeedsService {
    private readonly logger = new Logger(SeedsService.name);
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Orderitem)
        private readonly orderitemRepository: Repository<Orderitem>,
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        private readonly dataSource: DataSource,
    ){}
  async seed(){
    let queryRunner;
    try{
    this.logger.log('clearing the database...');
        queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

    try{
        await queryRunner.query('DELETE FROM products');
        await queryRunner.query('DELETE FROM orders');
        await queryRunner.query('DELETE FROM orderitems');
        await queryRunner.query('DELETE FROM payments');
        await queryRunner.commitTransaction();
        this.logger.log('Database cleared successfully');
    }
    catch(error){
        await queryRunner.rollbackTransaction();
        this.logger.error('Error clearing the database:', error);
        throw error;
    }
    finally{
        await queryRunner.release();
    }
//seeding the products
const Users:User[]=[]
const usersData = [
    {
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'password',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
    }
]



    }catch(error){}
    

}
}
