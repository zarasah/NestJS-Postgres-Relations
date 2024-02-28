import { ApiProperty } from "@nestjs/swagger";
import { Book } from "src/book/entities/book.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
    @ApiProperty({ type: 'integer', example: 1, description: 'The unique identifier of the author' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: 'string', example: 'Paulo Coelho', description: 'The name of the author' })
    @Column({ unique: true })
    name: string;

    @ApiProperty({ type: 'string', example: 'American', description: 'The nationality of the author' })
    @Column({ nullable: true })
    nationality: string;
  
    @ApiProperty({ type: () => Book, isArray: true, description: 'Array of books authored by the author' })
    @ManyToMany(() => Book, book => book.authors, { cascade: true })
    books: Book[];
}
