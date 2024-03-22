import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import e from 'express';
import { CreateUserDto, LoginUserDto } from 'src/dtos/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  getAuth(): string {
    return this.authService.getAuth();
  }

  @Post('/signin')
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }

  @Post('/signup')
  signUp(@Body() user: CreateUserDto) {
    const { confirmPassword, ...userWithoutPassword } = user;
    return this.authService.signUp(userWithoutPassword);
  }
}
