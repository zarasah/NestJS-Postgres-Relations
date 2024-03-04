import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { Author } from "src/author/entities/author.entity";

export class CreateBookDto {
    @ApiProperty({ type: 'string', example: 'Book Title', description: 'The title of the book' })
    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @ApiProperty({ type: 'string', example: 'en', description: 'The language of the book' })
    @IsOptional()
    @IsString({ message: 'Language must be a string' })
    language?: string;

    @ApiProperty({ type: 'integer', example: 300, description: 'The page count of the book' })
    @IsOptional()
    @IsInt({ message: 'Page count must be an integer' })
    @IsPositive({ message: 'Page count must be a positive number' })
    pageCount?: number;
  
    @ApiProperty({ type: 'string', example: 'Description', description: 'The description of the book' })
    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @ApiProperty({ type: 'array', items: { type: 'integer' }, example: [1, 2, 3], description: 'The IDs of authors associated with the book' })
    @IsOptional()
    @IsArray({ message: 'Author IDs must be provided as an array' })
    @IsInt({ each: true, message: 'Each author ID must be an integer' })
    authorIds?: number[];
  
    @ApiProperty({ type: Author, isArray: true, description: 'Array of authors associated with the book' })
    @IsOptional()
    @IsArray({ message: 'Author data must be provided as an array' })
    @ValidateNested({ each: true, message: 'Each author data must be a valid Author object' })
    @Type(() => Author)
    authorData?: Author[];
}
