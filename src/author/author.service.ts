import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { In, Repository } from 'typeorm';
import { Book } from 'src/book/entities/book.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const existingAuthor = await this.authorRepository.findOne({ where: { name: createAuthorDto.name }, relations: ['books'] });
    
    if (existingAuthor) {
      throw new BadRequestException(`Author with the name '${existingAuthor.name}' already exists.`);
    }

    let newAuthor = this.authorRepository.create({
      name: createAuthorDto.name,
      nationality: createAuthorDto.nationality !== undefined ? createAuthorDto.nationality : null,
    })

    if (createAuthorDto.bookIds && createAuthorDto.bookIds.length > 0) {
      const books = await this.bookRepository.find({
        where: { id: In(createAuthorDto.bookIds) },
      });
      if (books.length !== createAuthorDto.bookIds.length) {
        throw new Error('One or more books not found');
      }
      newAuthor.books = books;
    } else if (createAuthorDto.bookData && createAuthorDto.bookData.length > 0) {
      newAuthor.books = createAuthorDto.bookData;
    }

    return this.authorRepository.save(newAuthor);
  }

  async findAll() {
    try {
      return await this.authorRepository.find();
    } catch(error) {
      throw new Error('Failed to fetch authors');
    }
  }

  async findOne(id: number) {
    const author = await this.authorRepository.findOne({
      where: {
        id
      },
      relations: {
        books: true
      }
    });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorRepository.findOne({
      where: {
        id
      },
      relations: ['books']
    })

    if(!author) {
      throw new NotFoundException(`Author with ID ${id} not found`)
    }

    if (updateAuthorDto.removeBookIds && updateAuthorDto.removeBookIds.length > 0) {
      const booksToRemove = author.books.filter(book => updateAuthorDto.removeBookIds.includes(book.id));
      author.books = author.books.filter(book => !updateAuthorDto.removeBookIds.includes(book.id));
    }

    if (updateAuthorDto.bookIds && updateAuthorDto.bookIds.length > 0) {
      const booksToAdd = await this.bookRepository.find({ where: { id: In(updateAuthorDto.bookIds) } });
  
      if (booksToAdd.length !== 0) {
        const newBooks = booksToAdd.filter(book => !author.books.find(existingBook => existingBook.id === book.id));
  
        author.books.push(...newBooks);
      }
    }

    const { bookIds, removeBookIds, ...authorDtoWithoutBookIds } = updateAuthorDto;
    Object.assign(author, authorDtoWithoutBookIds);

    return this.authorRepository.save(author);    
  }

  async remove(id: number) {
    try {
      const author = await this.authorRepository.findOne({
        where: {
          id
        }
      });

      if (!author) {
        throw new NotFoundException(`Author with id ${id} not found`);
      }

      await this.authorRepository.remove(author);

      return { message: 'Author deleted successfully' };
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(`Failed to remove author with id ${id}`);
    }
  }
}
