import { ApiProperty } from "@nestjs/swagger";
import { Author } from "src/author/entities/author.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @ApiProperty({ type: 'integer', example: 1, description: 'The unique identifier of the book' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: 'string', example: 'Book Title', description: 'The title of the book' })
    @Column({ unique: true })
    title: string;

    @ApiProperty({ type: 'string', example: 'en', description: 'The language of the book' })
    @Column({ nullable: true })
    language?: string;

    @ApiProperty({ type: 'integer', example: 300, description: 'The page count of the book' })
    @Column({ nullable: true })
    pageCount?: number;

    @ApiProperty({ type: 'string', example: 'Description', description: 'The description of the book' })
    @Column({ nullable: true })
    description?: string;

    @ApiProperty({ type: () => Author, isArray: true, description: 'Array of authors associated with the book' })
    @ManyToMany(() => Author, author => author.books)
    @JoinTable()
    authors: Author[];
}
