import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @ApiProperty({ type: 'integer', example: 1, description: 'The unique identifier of the user' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: 'string', example: 'user@example.com', description: 'The email of the user' })
    @Column({ unique: true, nullable: false  })
    email: string;

    @ApiProperty({ type: 'string', example: 'password', description: 'The password of the user' })
    @Column({ nullable: false })
    password: string;
}
