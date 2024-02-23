import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateAuthorDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsDate()
    birthdate?: Date;

    @IsOptional()
    @IsString()
    nationality?: string;
}
