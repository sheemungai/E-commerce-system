import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './http-exception.filters';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    //helmet configuration
    app.use(helmet());

    //cors cofiuguration
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
      credentials: true,
    });
    //global prefix for API routes
    app.setGlobalPrefix('api/v1');

    const configService = app.get(ConfigService);
    const PORT = configService.getOrThrow<number>('PORT');

    //swagger configuration
    const config = new DocumentBuilder()
      .setTitle('E-commerce API')
      .setDescription(
        `

The E-Commerce System allows users to browse products, add items to their cart, make purchases, and track their orders. Admins can manage products, orders, and users.

## 🏫 Core Features

This API provides endpoints for managing:

1.**👤 User Management – Registration, login, profile updates, and order tracking

2.**📦 Product – Browsing, filtering, and managing product listings

3.**🛒  Orders –  order placement, and tracking

4.**💳 Payments – Payment processing 



## 🔐 Authentication

This API uses **JWT Bearer tokens** for secure authentication. All protected endpoints require proper authorization.

### Getting Started:

1. **Login** using the \`POST /auth/signin\` endpoint
2. **Include the token** in your requests:   \`\`\`   Authorization: Bearer <your-access-token>   \`\`\`
3. **Refresh tokens** when needed using \`GET /auth/refresh\`

## 👥 Roles & Permissions


| **🔴 ADMIN** | Full system access ,Create, Read, Update, Delete all resources |
| **⚪ USER** | Acccess products, categories and orders |

## 📖 API Usage

- **Base URL**: \`http://localhost:8000/api/v1\`

    `,
      )
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('ecommerce')
      .addTag('auth', 'Authentication endpoints')
      .addTag('users', 'User management endpoints')
      .addTag('products', 'Product management endpoints')
      .addTag('orders', 'Order management endpoints')
      .addTag('payments', 'Payment processing endpoints')
      .addTag('categories', 'Product category management endpoints')
      .addTag('orderitems', 'Order item management endpoints')
      .addServer('http://localhost:8000/', 'Local development server')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      jsonDocumentUrl: '/api-json',
      swaggerOptions: {
        persistAuthorization: true,
        tagSorter: 'alpha',
        operationsSorter: 'alpha',
        docExpansion: 'none',
        filter: true,
      },
      customCss: `
      swagger-ui .topbar { display: none; }`,
      customSiteTitle: 'E-commerce API Documentation',
    });

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    await app.listen(PORT);
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger is available at http://localhost:${PORT}/api/docs`);
  } catch (error) {
    console.error('Error starting the application:', error);
  }
}
bootstrap();
