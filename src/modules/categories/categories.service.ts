import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'yustii-backend-common/dist/models/categories/categories.entity';
import { Repository, DeleteResult, FindManyOptions } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(category: Category): Promise<ICategory> {
    return this.categoryRepository.save(category);
  }

  findAll(query: FindManyOptions<Category>): Promise<ICategory[]> {
    return this.categoryRepository.find(query);
  }

  async update(idCategory: number, category: Category): Promise<ICategory> {
    const categorySave = await this.categoryRepository.update(
      idCategory,
      category,
    );

    if (!categorySave) throw new NotFoundException('Categoria no encontrada');

    return this.categoryRepository.findOne(idCategory);
  }

  delete(idCategory: number): Promise<DeleteResult> {
    return this.categoryRepository.softDelete(idCategory);
  }
}
