import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { Author } from "src/author/entities/author.entity";

export class CreateBookDto {
    @ApiProperty({ type: 'string', example: 'Book Title', description: 'The title of the book' })
    @IsString()
    title: string;

    @ApiProperty({ type: 'string', example: 'en', description: 'The language of the book' })
    @IsOptional()
    @IsString()
    language?: string;

    @ApiProperty({ type: 'integer', example: 300, description: 'The page count of the book' })
    @IsOptional()
    @IsInt()
    @IsPositive()
    pageCount?: number;
  
    @ApiProperty({ type: 'string', example: 'Description', description: 'The description of the book' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ type: 'array', items: { type: 'integer' }, example: [1, 2, 3], description: 'The IDs of authors associated with the book' })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    authorIds?: number[];
  
    @ApiProperty({ type: Author, isArray: true, description: 'Array of authors associated with the book' })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Author)
    authorData?: Author[];
}
