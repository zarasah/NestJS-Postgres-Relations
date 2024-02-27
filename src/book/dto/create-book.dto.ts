import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { Author } from "src/author/entities/author.entity";

export class CreateBookDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    language?: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    pageCount?: number;
  
    @IsOptional()
    @IsString()
    description?: string;

    // @IsOptional()
    // @IsArray()
    // authors?: number[];

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    authorIds?: number[];
  
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Author)
    authorData?: Author[];
}
