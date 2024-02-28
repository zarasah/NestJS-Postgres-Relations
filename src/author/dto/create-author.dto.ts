import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Book } from "src/book/entities/book.entity";

export class CreateAuthorDto {
    @ApiProperty({ type: 'string', example: 'Paulo Coelho', description: 'The name of the author' })
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsString()
    name: string;

    @ApiProperty({ type: 'string', example: 'American', description: 'The nationality of the author' })
    @IsOptional()
    @IsString()
    nationality?: string;

    @ApiProperty({ type: 'array', items: { type: 'number' }, example: [1, 2, 3], description: 'The IDs of books associated with the author' })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    bookIds?: number[];
  
    @ApiProperty({ type: Book, isArray: true, description: 'Array of books associated with the author' })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Book)
    bookData?: Book[];
}