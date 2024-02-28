import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @ApiProperty({ type: 'number', example: 1, description: 'The unique identifier of the product' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: 'text', example: 'Product Name', description: 'The name of the product' })
    @Column()
    name: string;

    @ApiProperty({ type: 'text', example: 'Product Description', description: 'The description of the product' })
    @Column()
    description: string;

    @ApiProperty({ type: 'number', example: 10.99, description: 'The price of the product' })
    @Column({ type: 'float' })
    price: number;

    @ManyToOne(() => Category, category => category.products, {eager: true})
    @JoinColumn({ name: "category_id", referencedColumnName: "id" })
    @ApiProperty({ type: () => Category, description: 'The category of the product' })
    category: Category;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
