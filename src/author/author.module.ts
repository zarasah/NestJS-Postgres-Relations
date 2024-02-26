import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Book } from 'src/book/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author, Book])
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
