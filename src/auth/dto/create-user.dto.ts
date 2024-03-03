import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ type: 'string', example: 'user@example.com', description: 'The email of the user' })
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty({ type: 'string', example: 'password', description: 'The password of the user' })
    @IsNotEmpty({ message: 'Password cannot be empty' })
    password: string;
}