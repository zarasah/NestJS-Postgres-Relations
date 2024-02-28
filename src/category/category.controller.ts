import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({summary: 'Create new category'})
  @ApiResponse({status: 201, type: Category})
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({summary: 'Get all categories'})
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiResponse({ status: 200, type: Category })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiResponse({ status: 200, type: Category })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
