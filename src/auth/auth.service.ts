import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { Users } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private UsersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  getAuth(): string {
    return 'This will return the auth';
  }

  async signIn(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.UsersRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const userPayload = {
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(userPayload);

    return {
      token,
      message: 'User logged in successfully',
    };
  }

  async signUp(user: Partial<Users>) {
    const { email, password } = user;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    const foundUser = await this.UsersRepository.getUserByEmail(email);

    if (foundUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      throw new BadRequestException('Error hashing password');
    }

    return await this.UsersRepository.addUser({
      ...user,
      password: hashedPassword,
    });
  }
}
