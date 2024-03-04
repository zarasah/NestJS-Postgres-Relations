import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async login(authDto: AuthDto) {
    const user = await this.validateUser(authDto)

    if(!user){
      throw new NotFoundException({message: 'Invalid email or password'})
    }
    const token = await this.generateToken(user)
      return {userId: user.id, email: user.email, token};
  }

  async registration(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 5)
    const newUser = this.userRepository.create({
      email: createUserDto.email,
      password: hashPassword
    })

    const token = await this.generateToken(newUser)
    const user = await this.userRepository.save(newUser)
    const response = {userId: user.id, email: user.email, token}
    return {data: response}
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private async generateToken(user: User) {
    const payload = {email: user.email, id: user.id }
    return this.jwtService.sign(payload)
  }

  private async validateUser(authDto: AuthDto) {
    const user = await this.userRepository.findOne({where:{email: authDto.email}})
    const passwordEquals = await bcrypt.compare(authDto.password, user.password);
    
    if (user && passwordEquals) {
        return user;
    } else {
      throw new UnauthorizedException({message: 'Invalid email or password'})
    }
  }
}
