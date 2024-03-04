import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({type: 'text', example: 'Category name', description: 'The name of the category'})
    @IsNotEmpty({ message: 'Name should not be empty' })
    @IsString({ message: 'Name should be a string' })
    name:string;

    @ApiProperty({type: 'text', example: 'Category Description', description: 'The description of the category'})
    @IsNotEmpty({ message: 'Name should not be empty' })
    @IsString({ message: 'Name should be a string' })
    description: string;
}
