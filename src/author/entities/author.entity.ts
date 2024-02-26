import { Book } from "src/book/entities/book.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    // @Column({ nullable: true })
    // birthdate: Date;

    @Column({ nullable: true })
    nationality: string;
  
    @ManyToMany(() => Book, book => book.authors, { cascade: true })
    books: Book[];
}
