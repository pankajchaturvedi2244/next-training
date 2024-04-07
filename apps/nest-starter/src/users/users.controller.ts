import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { GetUserIP } from './user.decorator';
import { CustomValidationPipe } from './pipes/custom-validation.pipe';
import { MongoIdValidationPipe } from './pipes/mongoid-validation-pipe';
import { UsersGuard } from './guards/userguards/users.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesguardGuard } from './guards/rolesguard/rolesguard.guard';
import { FormatResponseInterceptor } from '../common/interceptors/formatter.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseInterceptors(FormatResponseInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('profile')
  getProfile(@GetUserIP() IP: string) {
    return IP;
  }

  // route handler for the GET /users endpoint
  @Get()
  @Roles(['admin'])
  @UseGuards(AuthGuard('jwt'), UsersGuard, RolesguardGuard)
  getUsers() {
    return this.userService.getUsers();
  }
  // route handler for the GET /users/:id endpoint
  @Get(':id')
  @Roles(['Admin']) // Call the Roles decorator as a function with the required arguments
  @UseGuards(UsersGuard, RolesguardGuard)
  async getUserById(
    @Param('id', MongoIdValidationPipe)
    id: string,
  ) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  // route handler for the POST /users endpoint
  @Post()
  // validate the request body using the CreateUserDto
  @UsePipes(new CustomValidationPipe())
  async createUser(
    @Body()
    user: CreateUserDto,
  ) {
    const newUser = await this.userService.createUser(user);
    if (!newUser) {
      throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
    }

    return newUser;
  }
  // route handler for the PATCH /users/:id endpoint
  @Patch(':id')
  //validate id using MongoIdValidationPipe and
  // validate the request body using the ValidationPipe
  @UsePipes(ValidationPipe)
  async updateUser(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body(
      new CustomValidationPipe(),
      new ValidationPipe({ skipMissingProperties: true }),
    )
    user: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(id, user);

    if (!updatedUser) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  // route handler for the DELETE /users/:id endpoint
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userService.deleteUser(id);

    if (!deletedUser) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'User deleted successfully',
      deletedUser,
    };
  }
}
