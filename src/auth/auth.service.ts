import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
@Injectable()
export class AuthService {
  constructor(private UsersRepository: UsersRepository) {}
  getAuth(): string {
    return 'This will return the auth';
  }

  async signIn(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.UsersRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password === password) {
      return 'Logged in';
    }
    throw new BadRequestException('Invalid credentials');
  }
}
