import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { OrderitemsModule } from './orderitems/orderitems.module';
import { ConfigService } from '@nestjs/config';
import { createKeyv, Keyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CacheModule } from '@nestjs/cache-manager';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
// import { AuthorizationModule } from './authorization/authorization.module';
import { LogsModule } from './logs/logs.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './auth/guards';

import { LoggerMiddleware } from './logger.middleware';

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
    // SeedsModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (configService: ConfigService) => {
        return {
          ttl: 60000, // 60 sec: Cache time-to-live
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 30000, lruSize: 5000 }),
            }),
            createKeyv(configService.getOrThrow<string>('REDIS_URL')),
          ],
        };
      },
    }),
    CategoriesModule,
    // AuthorizationModule,
    LogsModule,
    SeedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: CacheInterceptor, // global guard for access token for alll routes
    },
    {
      provide: 'APP_GUARD',
      //global guard for access token for all routes
      useClass: AtGuard,
    },
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
