import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ type: 'string', example: 'Product Name', description: 'The name of the product' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: 'text', example: 'Product Description', description: 'The description of the product' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ type: 'number', example: 10.99, description: 'The price of the product' })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()  
    price: number;

    @ApiProperty({ type: 'number', example: 1, description: 'The ID of the category to which the product belongs' })
    @IsNotEmpty()
    categoryId: number;
}
