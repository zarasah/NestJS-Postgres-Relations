import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<{data: Category}> {
    const existCategory = await this.categoryRepository.findOne({
      where: {
        name: createCategoryDto.name
      }
    })

    if (existCategory) {
      throw new BadRequestException('Category with the same name already exists.')
    }

    const category = await this.categoryRepository.save({
      name: createCategoryDto.name,
      description: createCategoryDto.description
    })

    return {data: category};
  }

  async findAll() {
    try {
      const allcategories = await this.categoryRepository.find({
        select: ['id', 'name', 'description'],
        // relations: ['products']
      });
  
      return { data: allcategories };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          id,
        },
        select: ['id', 'name', 'description'],
        relations: ['products']
      });
  
      return { data: category };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: {
        id
      }
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (updateCategoryDto.name !== undefined) {
      category.name = updateCategoryDto.name;
    }

    if (updateCategoryDto.description !== undefined) {
      category.description = updateCategoryDto.description;
    }

    const updatedCategory = await this.categoryRepository.save(category);

    return { data: updatedCategory }
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        id
      }
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.remove(category);

    return { message: 'Category deleted successfully' };
  }
}
