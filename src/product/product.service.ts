import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const existCategory = await this.categoryRepository.findOne({
      where: {
        id: createProductDto.categoryId
      }
    });

    if (!existCategory) {
      throw new NotFoundException('Category not found');
    }

    const existProduct = await this.productRepository.findOne({
      where: {
        name: createProductDto.name,
        category: {id: createProductDto.categoryId}
      }
    })
    
    if (existProduct) {
      throw new BadRequestException('A product with the same name and category already exists')
    }

    const newProduct = this.productRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      category: { id: createProductDto.categoryId }
    });

    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    try {
      return await this.productRepository.find({ 
        // relations: ['category'],
        // select: {
          // category: {
          //   id: true,
          //   name: true
          // }
        // }
      });
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          id
        },
        // relations: ['category'],
        // select: {
        //   category: {
        //     id: true,
        //     name: true
        //   }
        // }        
      });

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      return product;
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          id
        }
      });

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      // if (updateProductDto.categoryId !== undefined) {
      //   product.category.id = updateProductDto.categoryId;
      // }
      if (updateProductDto.categoryId !== undefined) {
        const category = await this.categoryRepository.findOne({
          where: {
            id: updateProductDto.categoryId
          }
        });
        
        if (!category) {
          throw new NotFoundException(`Category with id ${updateProductDto.categoryId} not found`);
        }
        product.category = category;
      }

      const { categoryId, ...restUpdateProductDto } = updateProductDto;
      Object.assign(product, restUpdateProductDto);

      return await this.productRepository.save(product);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        console.log(error)
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  async remove(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          id
        }
      });

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      await this.productRepository.remove(product);

      return { message: 'Product deleted successfully' };
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(`Failed to remove product with id ${id}`);
    }
  }
}
