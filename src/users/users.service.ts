import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AddressDto } from './dto/address.dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  // mock 5 users
  private users: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: AddressDto;
  }[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      address: {
        city: 'Anycity',
        state: 'AnyState',
        country: 'USA',
        zip: '12345',
        address1: '123 Oak St',
        address2: 'Apt 456',
      },
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      address: {
        city: 'Anycity',
        state: 'AnyState',
        country: 'USA',
        zip: '12345',
        address1: '123 Oak St',
        address2: 'Apt 456',
      },
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      address: {
        city: 'Anycity',
        state: 'AnyState',
        country: 'USA',
        zip: '12345',
        address1: '123 Oak St',
        address2: 'Apt 456',
      },
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Brown',
      email: 'emily.brown@example.com',
      address: {
        city: 'Anycity',
        state: 'AnyState',
        country: 'USA',
        zip: '12345',
        address1: '123 Oak St',
        address2: 'Apt 456',
      },
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@example.com',
      address: {
        city: 'Anycity',
        state: 'AnyState',
        country: 'USA',
        zip: '12345',
        address1: '123 Oak St',
        address2: 'Apt 456',
      },
    },
    {
      id: 6,
      firstName: 'Sarah',
      lastName: 'Martinez',
      email: 'sarah.martinez@example.com',
      address: {
        city: 'Anycity',
        state: 'AnyState',
        country: 'USA',
        zip: '12345',
        address1: '123 Oak St',
        address2: 'Apt 456',
      },
    },
    {
      id: 7,
      firstName: 'Daniel',
      lastName: 'Taylor',
      email: 'daniel.taylor@example.com',
      address: {
        city: 'Anycity',
        state: 'AnyState',
        country: 'USA',
        zip: '12345',
        address1: '123 Oak St',
        address2: 'Apt 456',
      },
    },
    {
      id: 8,
      firstName: 'Olivia',
      lastName: 'Thomas',
      email: 'olivia.thomas@example.com',
      address: {
        city: 'Anycity',
        state: 'AnyState',
        country: 'USA',
        zip: '12345',
        address1: '123 Oak St',
        address2: 'Apt 456',
      },
    },
  ];

  getUsers(): Array<object> {
    return this.users;
  }
  getUserById(id: string): object {
    return this.users.find((user) => user.id === +id);
  }
  createUser(user: CreateUserDto): object {
    // add user to the list of users
    this.users.push({ id: this.users.length + 1, ...user });
    return user;
  }
  updateUser(id: string, user: UpdateUserDto): object {
    const userIndex = this.users.findIndex((user) => user.id === +id);
    this.users[userIndex] = { ...this.users[userIndex], ...user };
    return this.users[userIndex];
  }

  deleteUser(id: string): string {
    if (!this.users.find((user) => user.id === +id)) {
      return 'User not found';
    }
    this.users = this.users.filter((user) => user.id !== +id);
    return 'User deleted successfully';
  }
}
