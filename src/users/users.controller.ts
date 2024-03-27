import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { CustomValidationPipe } from './custom-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  // route handler for the GET /users endpoint
  @Get()
  // use http 700 for the response
  @HttpCode(HttpStatus.ACCEPTED)
  getUsers() {
    return this.userService.getUsers();
  }
  // route handler for the GET /users/:id endpoint
  @Get(':id')
  @HttpCode(HttpStatus.AMBIGUOUS)
  getUserById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.userService.getUserById(id);
  }
  // route handler for the POST /users endpoint
  @Post()
  // validate the request body using the CreateUserDto
  @UsePipes(new CustomValidationPipe())
  createUser(
    @Body()
    user: CreateUserDto,
  ) {
    return this.userService.createUser(user);
  }
  // route handler for the PATCH /users/:id endpoint
  @Patch(':id')
  @HttpCode(HttpStatus.HTTP_VERSION_NOT_SUPPORTED)
  @UsePipes(ValidationPipe)
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }
  // route handler for the DELETE /users/:id endpoint
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
