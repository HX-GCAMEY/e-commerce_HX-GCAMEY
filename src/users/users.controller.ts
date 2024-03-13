import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.usersService.getUsers(page, limit);
    }
    return this.usersService.getUsers(1, 2);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Post()
  addUser(@Body() user: any) {
    return this.usersService.addUser(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() user: any) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
