import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: { category_id: createProductDto.category_id },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with id ${createProductDto.category_id} not found`,
      );
    }

    const product = this.productRepository.create({
      ...createProductDto,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.productRepository.save(product);
  }

  async findAll() {
    return this.productRepository.find({
      relations: ['category', 'orderitems'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
      relations: ['category', 'orderitems'],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    if (updateProductDto.category_id) {
      const category = await this.categoryRepository.findOne({
        where: { category_id: updateProductDto.category_id },
      });

      if (!category) {
        throw new NotFoundException(
          `Category with id ${updateProductDto.category_id} not found`,
        );
      }
    }

    await this.productRepository.update(id, {
      ...updateProductDto,
      updated_at: new Date(),
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.productRepository.delete(id);
    return { message: `Product with id ${id} has been deleted` };
  }
}
