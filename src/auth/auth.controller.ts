import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import e from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  getAuth(): string {
    return this.authService.getAuth();
  }

  @Post('/signin')
  signIn(@Body() credentials: any) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}
