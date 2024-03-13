import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private UsersRepository: UsersRepository) {}
  getAuth(): string {
    return 'This will return the auth';
  }

  async signIn(email: string, password: string) {
    if (!email || !password) {
      return 'Email and password are required';
    }

    const user = await this.UsersRepository.getUserByEmail(email);

    if (!user) {
      return 'User not found';
    }

    if (user.password === password) {
      return 'Logged in';
    }
    return 'Invalid credentials';
  }
}
