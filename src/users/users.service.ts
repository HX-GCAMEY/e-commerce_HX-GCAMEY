import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private UsersRepository: UsersRepository) {}
  getUsers(page: number, limit: number) {
    return this.UsersRepository.getUsers(page, limit);
  }

  getUser(id: number) {
    return this.UsersRepository.getUser(id);
  }

  addUser(user: any) {
    return this.UsersRepository.addUser(user);
  }

  updateUser(id: number, user: any) {
    return this.UsersRepository.updateUser(id, user);
  }

  deleteUser(id: number) {
    return this.UsersRepository.deleteUser(id);
  }
}
