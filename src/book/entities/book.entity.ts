import { Author } from "src/author/entities/author.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    title: string;

    @Column({ nullable: true })
    language?: string;

    @Column({ nullable: true })
    pageCount?: number;

    @Column({ nullable: true })
    description?: string;

    @ManyToMany(() => Author, author => author.books)
    @JoinTable()
    authors: Author[];
}
