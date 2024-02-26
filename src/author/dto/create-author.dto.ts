import { Type } from "class-transformer";
import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Book } from "src/book/entities/book.entity";

export class CreateAuthorDto {
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsString()
    name: string;

    // @IsOptional()
    // @IsDate()
    // birthdate?: string;

    @IsOptional()
    @IsString()
    nationality?: string;

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    bookIds?: number[];
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Book)
    bookData?: Book[];
}