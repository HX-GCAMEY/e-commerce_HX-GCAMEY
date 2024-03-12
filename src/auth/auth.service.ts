import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private UsersRepository: UsersRepository) {}
  getAuth(): string {
    return 'This will return the auth';
  }

  signIn(email: string, password: string) {
    if (!email || !password) {
      return 'Email and password are required';
    }

    const user = this.UsersRepository.getUserByEmail(email);

    if (!user) {
      return 'User not found';
    }

    if (user.password === password) {
      return 'Logged in';
    }
    return 'Invalid credentials';
  }
}
