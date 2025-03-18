import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Phone Number is already taken.' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate a user and return a JWT token' })
  @ApiBody({
    description: 'User login credentials',
    required: true,
    type: LoginDto,
    examples: {
      example1: {
        summary: 'Valid login',
        value: {
          phoneNumber: '+998901234567',
          password: 'yourpassword',
        },}}
  })
  @ApiResponse({
    description: 'User authenticated successfully.',
    schema: {
      example: {
        accessToken: 'your.jwt.token'
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid phone number or password.' })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.phoneNumber, body.password);
  }
}
