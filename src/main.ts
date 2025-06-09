import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './http-exception.filters';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    const configService = app.get(ConfigService);
    const PORT = configService.getOrThrow<number>('PORT');
    //swagger configuration
    const config = new DocumentBuilder()
      .setTitle('E-commerce API')
      .setDescription('API documentation for the E-commerce application')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('ecommerce')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      jsonDocumentUrl: '/api-json',
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
