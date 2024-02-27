import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { In, Repository } from 'typeorm';
import { Author } from 'src/author/entities/author.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>
  ) {}

  async create(createBookDto: CreateBookDto) {
    const existingBook = await this.bookRepository.findOne({ where: { title: createBookDto.title }, relations: ['authors'] });
    
    if (existingBook) {
      throw new BadRequestException(`Book with the title '${existingBook.title}' already exists.`);
    }

    let newBook = this.bookRepository.create({
      title: createBookDto.title,
      language: createBookDto.language !== undefined ? createBookDto.language : null,
      pageCount: createBookDto.pageCount !== undefined ? createBookDto.pageCount : null,
      description: createBookDto.description !== undefined ? createBookDto.description : null,
    })

    if (createBookDto.authorIds && createBookDto.authorIds.length > 0) {
      const authors = await this.authorRepository.find({
        where: { id: In(createBookDto.authorIds) },
      });

      if (authors.length !== createBookDto.authorIds.length) {
        throw new Error('One or more authors not found');
      }
      newBook.authors = authors;
    } else if (createBookDto.authorData && createBookDto.authorData.length > 0) {
      newBook.authors = createBookDto.authorData;
    }

    return this.bookRepository.save(newBook); 
  }

  async findAll() {
    try {
      return await this.bookRepository.find();
    } catch(error) {
      throw new Error('Failed to fetch books');
    }
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({
      where: {
        id
      },
      relations: {
        authors: true
      }
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({
      where: {
        id
      },
      relations: ['authors']
    })

    if(!book) {
      throw new NotFoundException(`Book with ID ${id} not found`)
    }

    if (updateBookDto.removeAuthorIds && updateBookDto.removeAuthorIds.length > 0) {
      const authorsToRemove = book.authors.filter(author => updateBookDto.removeAuthorIds.includes(author.id));
      book.authors = book.authors.filter(author => !updateBookDto.removeAuthorIds.includes(author.id));
    }

    if (updateBookDto.authorIds && updateBookDto.authorIds.length > 0) {
      const authorsToAdd = await this.authorRepository.find({ where: { id: In(updateBookDto.authorIds) } });
  
      if (authorsToAdd.length !== 0) {
        const newAuthors = authorsToAdd.filter(author => !book.authors.find(existingAuthor => existingAuthor.id === author.id));
  
        book.authors.push(...newAuthors);
      }
    }
    const { authorIds, removeAuthorIds, ...bookDtoWithoutAuthorIds } = updateBookDto;
    Object.assign(book, bookDtoWithoutAuthorIds);

    return this.bookRepository.save(book); 
  }

  async remove(id: number) {
    try {
      const book = await this.bookRepository.findOne({
        where: {
          id
        }
      });

      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }

      await this.bookRepository.remove(book);

      return { message: 'Book deleted successfully' };
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(`Failed to remove book with id ${id}`);
    }
  }
}
