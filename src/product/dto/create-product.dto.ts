import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ type: 'string', example: 'Product Name', description: 'The name of the product' })
    @IsNotEmpty({ message: 'Name should not be empty' })
    @IsString({ message: 'Name should be a string' })
    name: string;

    @ApiProperty({ type: 'text', example: 'Product Description', description: 'The description of the product' })
    @IsNotEmpty({ message: 'Description should not be empty' })
    @IsString({ message: 'Description should be a string' })
    description: string;

    @ApiProperty({ type: 'number', example: 10.99, description: 'The price of the product' })
    @IsNotEmpty({ message: 'Price should not be empty' })
    @IsNumber({}, { message: 'Price must be a number' })
    @IsPositive({ message: 'Price must be a positive number' })  
    price: number;

    @ApiProperty({ type: 'number', example: 1, description: 'The ID of the category to which the product belongs' })
    @IsNotEmpty({ message: 'CategoryId should not be empty' })
    categoryId: number;
}
