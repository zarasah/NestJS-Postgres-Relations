import { PartialType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

export class UpdateAuthDto extends PartialType(AuthDto) {}
