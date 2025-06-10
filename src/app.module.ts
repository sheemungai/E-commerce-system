import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { OrderitemsModule } from './orderitems/orderitems.module';

import { CategoriesModule } from './categories/categories.module';
import { LogsModule } from './logs/logs.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
// import { AtGuard } from './auth/guards';s

import { LoggerMiddleware } from './logger.middleware';

// import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    ProductsModule,
    UsersModule,
    OrdersModule,
    PaymentsModule,
    OrderitemsModule,
    CategoriesModule,
    // AuthorizationModule,
    LogsModule,
    SeedModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
   
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        'users',
        'products',
        'categories',
        'orders',
        'orderitems',
        'payment',
      );
  }
}
