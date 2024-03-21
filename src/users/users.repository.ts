import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number): Promise<Partial<Users>[]> {
    let users = await this.usersRepository.find();

    const start = (page - 1) * limit;
    const end = start + +limit;

    users = users.slice(start, end);

    return users.map(({ password, ...user }) => user);
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async addUser(user: Partial<Users>): Promise<Partial<Users>> {
    const newUser = await this.usersRepository.save(user);

    const { password, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  async updateUser(id: string, user: Partial<Users>) {
    await this.usersRepository.update(id, user);

    const updatedUser = await this.usersRepository.findOneBy({ id });

    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  async deleteUser(id: string): Promise<Partial<Users>> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.usersRepository.remove(user);

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async getUserByEmail(email: string): Promise<Users> {
    return await this.usersRepository.findOneBy({ email });
  }
}
