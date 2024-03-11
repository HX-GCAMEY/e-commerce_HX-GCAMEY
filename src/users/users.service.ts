import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers(): string {
    return 'This will return all users';
  }
}
