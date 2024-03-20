import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  // route handler for the GET /users endpoint
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  // route handler for the GET /users/:id endpoint
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
  // route handler for the POST /users endpoint
  @Post()
  createUser(
    @Body()
    user: CreateUserDto,
  ) {
    return this.userService.createUser(user);
  }
  // route handler for the PATCH /users/:id endpoint
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }
  // route handler for the DELETE /users/:id endpoint
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
