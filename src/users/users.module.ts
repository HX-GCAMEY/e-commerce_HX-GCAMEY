import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from '../entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
