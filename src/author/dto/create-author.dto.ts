import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Book } from "src/book/entities/book.entity";

export class CreateAuthorDto {
    @ApiProperty({ type: 'string', example: 'Paulo Coelho', description: 'The name of the author' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @ApiProperty({ type: 'string', example: 'American', description: 'The nationality of the author' })
    @IsOptional()
    @IsString({ message: 'Nationality must be a string' })
    nationality?: string;

    @ApiProperty({ type: 'array', items: { type: 'number' }, example: [1, 2, 3], description: 'The IDs of books associated with the author' })
    @IsOptional()
    @IsArray({ message: 'Book IDs must be provided as an array' })
    @IsInt({ each: true, message: 'Each book ID must be an integer' })
    bookIds?: number[];
  
    @ApiProperty({ type: Book, isArray: true, description: 'Array of books associated with the author' })
    @IsOptional()
    @IsArray({ message: 'Book data must be provided as an array' })
    @ValidateNested({ each: true, message: 'Each book data must be a valid Book object' })
    @Type(() => Book)
    bookData?: Book[];
}