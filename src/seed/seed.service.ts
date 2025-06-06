import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Orderitem } from 'src/orderitems/entities/orderitem.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Orderitem)
    private readonly orderitemRepository: Repository<Orderitem>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly dataSource: DataSource,
  ) {}

  async seed() {
    this.logger.log('Started seeding the database');

    try {
      this.logger.log('Clearing the database');
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        await queryRunner.query('DELETE FROM users');
        await queryRunner.query('DELETE FROM orders');
        await queryRunner.query('DELETE FROM orderitems');
        await queryRunner.query('DELETE FROM products');
        await queryRunner.query('DELETE FROM category');
        await queryRunner.query('DELETE FROM payment');

        await queryRunner.commitTransaction();
        this.logger.log('All tables cleared successfully');
      } catch (error) {
        await queryRunner.rollbackTransaction();
        this.logger.error('Error clearing the database:', error);
        throw error;
      } finally {
        await queryRunner.release();
      }
      //seeding the user
      this.logger.log('seeding users');
      const users: User[] = [];
      const userNames = [
        'John Doe',
        'Jane Smith',
        'Alice Johnson',
        'Bob Brown',
        'Charlie Davis',
        'Eve White',
        'Frank Black',
        'Grace Green',
        'Hannah Blue',
        'Ian Gray',
      ];
      for (const name of userNames) {
        const newUser = new User();
        newUser.username = name;
        newUser.email = `${newUser.username.toLowerCase().replace(' ', '.')}@example.com`;
        newUser.password = 'password123';
        newUser.created_at = new Date();
        newUser.updated_at = new Date();
        users.push(newUser);
      }
      this.logger.log(` Created ${users.length} users`);

      // seeding orders
      this.logger.log('seeding orders.');
      const orders: Order[] = [];
      const orderNames = [
        'Order 1',
        'Order 2',
        'Order 3',
        'Order 4',
        'Order 5',
        'Order 6',
        'Order 7',
        'Order 8',
        'Order 9',
        'Order 10',
      ];
      for (const number of orderNames) {
        const newOrder = new Order();
        newOrder.user_id = faker.number.int({ min: 1, max: users.length - 1 });
        newOrder.total_amount = parseFloat(faker.commerce.price());
        newOrder.created_at = new Date();
        newOrder.updated_at = new Date();

        orders.push(newOrder);
      }
      this.logger.log(` Created ${orders.length} orders`);

      //seeding categories
      this.logger.log('seeding categories');
      const categories: Category[] = [];
      const categoryNames = [
        'Electronics',
        'Clothing',
        'Books',
        'Home Appliances',
        'Toys',
        'Sports Equipment',
        'Beauty Products',
        'Furniture',
      ];
      for (const name of categoryNames) {
        const newCategory = new Category();
        newCategory.category_name = name;
        newCategory.created_at = new Date();
        categories.push(newCategory);
      }
      this.logger.log(` Created ${categories.length} categories`);

      //seeding products
      this.logger.log('seeding products.');
      const products: Product[] = [];
      const productNames = [
        'Laptop',
        'Smartphone',
        'Headphones',
        'Dresses',
        'Books',
        'Toy Gun',
        'Football',
        'Beauty Cream',
        'Sofa',
        'Dining Table',
      ];
      for (const name of productNames) {
        const newProduct = new Product();
        newProduct.name = name;
        newProduct.price = parseFloat(faker.commerce.price());
        newProduct.description = faker.commerce.productDescription();
        newProduct.category_id = faker.number.int({
          min: 1,
          max: categories.length - 1,
        });
        newProduct.created_at = new Date();
        newProduct.updated_at = new Date();
        products.push(newProduct);
      }
      this.logger.log(` Created ${products.length} products`);

      //seeding order items
      this.logger.log('seeding order items ..');
      const orderitems: Orderitem[] = [];
      const orderitemNames = [
        'Order Item 1',
        'Order Item 2',
        'Order Item 3',
        'Order Item 4',
        'Order Item 5',
        'Order Item 6',
        'Order Item 7',
        'Order Item 8',
        'Order Item 9',
        'Order Item 10',
      ];
      for (const number of orderitemNames) {
        const newOrderitem = new Orderitem();
        newOrderitem.order_id = faker.number.int({
          min: 1,
          max: orders.length - 1,
        });
        newOrderitem.product_id = faker.number.int({
          min: 1,
          max: products.length - 1,
        });
        newOrderitem.quantity = faker.number.int({ min: 1, max: 5 });
        newOrderitem.price = parseFloat(faker.commerce.price());
        orderitems.push(newOrderitem);
      }
      this.logger.log(` Created ${orderitems.length} order items`);

      //seeding payments
      this.logger.log('seeding payments ..');
      const payments: Payment[] = [];
      const paymentMethods = [
        'Credit Card',
        'PayPal',
        'Bank Transfer',
        'Cash on Delivery',
      ];

      for (const name of paymentMethods) {
        const newPayment = new Payment();
        newPayment.order_id = faker.number.int({
          min: 1,
          max: orders.length - 1,
        });
        newPayment.amount = parseFloat(faker.commerce.price());
        newPayment.payment_method = name;
        newPayment.payment_status = 'Completed';
        newPayment.paid_at = new Date();
        newPayment.created_at = new Date();
        newPayment.updated_at = new Date();
        payments.push(newPayment);
      }
      this.logger.log(` Created ${payments.length} payments`);
    } catch (error) {
      this.logger.error('Error seeding data', error);
      throw error;
    }
  }
}
