import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
    @ApiProperty({type: 'number', example: '1', description: 'ID'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({type: 'text', example: 'Name', description: 'Name'})
    @Column()
    name: string;

    @ApiProperty({type: 'text', example: 'Description', description: 'Description'})
    @Column()
    description: string;

    @OneToMany(() => Product, product => product.category, {
        onDelete: 'CASCADE',
    })
    products: Product[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
