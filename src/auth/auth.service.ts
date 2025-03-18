import { ConflictException } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { phone, password } = createUserDto;
    const existingUser = await this.usersService.findByPhoneNumber(phone);
    if (existingUser) {
      throw new ConflictException('Phone Number is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return { message: 'User registered successfully' };
  }


  async login(phone: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByPhoneNumber(phone);
    if (!user) {
      throw new UnauthorizedException('Invalid phone or password');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid phone or password');
    }

    const payload = { userId: user._id, phone: user.phone };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
  
}