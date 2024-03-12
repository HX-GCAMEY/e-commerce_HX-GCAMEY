import { Injectable } from '@nestjs/common';

type User = {
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;
};

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      email: 'user1@example.com',
      name: 'John Doe',
      password: 'password123',
      address: '123 Main Street',
      phone: '123-456-7890',
      country: 'USA',
      city: 'New York',
    },
    {
      email: 'user2@example.com',
      name: 'Alice Smith',
      password: 'abc@123',
      address: '456 Elm Street',
      phone: '456-789-0123',
      country: 'Canada',
      city: 'Toronto',
    },
    {
      email: 'user3@example.com',
      name: 'Michael Johnson',
      password: 'securepass',
      address: '789 Oak Avenue',
      phone: '789-012-3456',
      country: 'UK',
      city: 'London',
    },
    {
      email: 'user4@example.com',
      name: 'Emily Brown',
      password: 'passw0rd',
      address: '101 Pine Street',
      phone: '012-345-6789',
      country: 'Australia',
      city: 'Sydney',
    },
    {
      email: 'user5@example.com',
      name: 'David Wilson',
      password: 'davidpass',
      address: '202 Cedar Avenue',
      phone: '234-567-8901',
    },
  ];

  getUsers() {
    return this.users;
  }
}
