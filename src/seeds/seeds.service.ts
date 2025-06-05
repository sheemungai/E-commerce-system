// import { Injectable, Logger } from '@nestjs/common';
// import { Repository, DataSource, QueryRunner } from 'typeorm';
// import { Product } from 'src/products/entities/product.entity';
// import { Order } from 'src/orders/entities/order.entity';
// import { Orderitem } from 'src/orderitems/entities/orderitem.entity';
// import { Payment } from 'src/payments/entities/payment.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { faker } from '@faker-js/faker';
// import { Category } from 'src/categories/entities/category.entity';

// @Injectable()
// export class SeedsService {
//   private readonly logger = new Logger(SeedsService.name);
//   constructor(
//     @InjectRepository(Product)
//     private readonly productRepository: Repository<Product>,
//     @InjectRepository(Category)
//     private readonly categoryRepository: Repository<Category>,
//     @InjectRepository(Order)
//     private readonly orderRepository: Repository<Order>,
//     @InjectRepository(Orderitem)
//     private readonly orderitemRepository: Repository<Orderitem>,
//     @InjectRepository(Payment)
//     private readonly paymentRepository: Repository<Payment>,
//     private readonly dataSource: DataSource,
//   ) {}
//   async seed() {
//     let queryRunner: QueryRunner;
//     try {
//       this.logger.log('clearing the database...');
//       queryRunner = this.dataSource.createQueryRunner();
//       await queryRunner.connect();
//       await queryRunner.startTransaction();

//       try {
//         await queryRunner.query('DELETE FROM products');
//         await queryRunner.query('DELETE FROM orders');
//         await queryRunner.query('DELETE FROM orderitems');
//         await queryRunner.query('DELETE FROM payments');
//         await queryRunner.query('DELETE FROM categories');
//         await queryRunner.commitTransaction();
//         this.logger.log('Database cleared successfully');
//       } catch (error) {
//         await queryRunner.rollbackTransaction();
//         this.logger.error('Error clearing the database:', error);
//         throw error;
//       } finally {
//         await queryRunner.release();
//       }
//       //seeding categories
//       this.logger.log('seeding the database...');
//       const categories: Category[] = [];
//       const categoryNames = [
//         'Clothing',
//         'Electronics',
//         'Home Appliances',
//         'Books',
//         'Furniture',
//       ];
//       for (const name of categoryNames) {
//         const newCategory = new Category();
//         newCategory.category_name = name;
//         newCategory.created_at = new Date();
//         categories.push(await this.categoryRepository.save(newCategory));
//       }
//       this.logger.log('Categories seeded successfully');

//       //seeding products
//       this.logger.log('Seeding products...');
//       const products: Product[] = [];
//       for (let i = 0; i < 10; i++) {
//         const newProduct = new Product();
//         newProduct.name = faker.commerce.productName();
//         newProduct.description = faker.commerce.productDescription();
//         newProduct.price = parseFloat(faker.commerce.price());
//         newProduct.img = faker.image.url();
//         newProduct.stock_quantity = faker.number.int({ min: 1, max: 100 });
//         newProduct.created_at = new Date();
//         newProduct.updated_at = new Date();
//         newProduct.category_id =
//           faker.helpers.arrayElement(categories).category_id;
//         products.push(await this.productRepository.save(newProduct));
//       }
//       this.logger.log('Products seeded successfully');

//       //seeding orders

//     //   this.logger.log('Seeding orders...');
//     //   const orders: Order[] = [];
//     //   const orderNames = [
//     //     'Order 1',
//     //     'Order 2',
//     //     'Order 3',
//     //     'Order 4',
//     //     'Order 5',
//     //   ];
//     //   for (const name of orderNames) {
//     //     const newOrder = new Order(); // Assuming users is an array of user objects;
//     //     newOrder.total_amount = parseFloat(faker.commerce.price());
//     //     newOrder.status = faker.helpers.arrayElement([
//     //       'PENDING',
//     //       'COMPLETED',
//     //       'CANCELLED',
//     //     ]);
//     //     orders.push(newOrder);
//     //   }
//     // } catch (error) {}
//   }
// }
// }
