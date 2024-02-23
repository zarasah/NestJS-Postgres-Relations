import { IsArray, IsInt, IsOptional, IsPositive, IsString } from "class-validator";

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
    shortDescription?: string;

    @IsOptional()
    @IsArray()
    authors?: number[];   
}
