import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { category_id: id },
    });
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { category_id: id },
    });
    if (!category) {
      return 'Category not found';
    }
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { category_id: id },
    });
    if (!category) {
      return 'Category not found';
    }
    return this.categoryRepository.delete(id);
  }
}
