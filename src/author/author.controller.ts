import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Author } from './entities/author.entity';

@ApiTags('Author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({summary: 'Create new author'})
  @ApiResponse({status: 201, type: Author})
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @ApiOperation({summary: 'Get all authors'})
  @ApiResponse({ status: 200, type: [Author] })
  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @ApiOperation({ summary: 'Get a author by ID' })
  @ApiResponse({ status: 200, type: Author })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a author by ID' })
  @ApiResponse({ status: 200, type: Author })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @ApiOperation({ summary: 'Delete a author by ID' })
  @ApiResponse({ status: 200, description: 'Author deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
