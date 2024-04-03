import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/User.schema';
import { Model } from 'mongoose';
import { Address } from './schemas/Address.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  async userExists(id: string): Promise<boolean> {
    const user = await this.userModel.findById(id).exec();
    return !!user;
  }

  async getUsers(): Promise<Array<User>> {
    return await this.userModel.find().exec();
  }
  async getUserById(id: string): Promise<object> {
    const user = await this.userModel.findById(id).exec();
    return user ? user.populate('address') : null;
  }

  // get way to assign type userdto
  async getUserByEmail(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });
    return user ? user : null;
  }
  async createUser({ address, ...user }: CreateUserDto): Promise<object> {
    // add user to the list of users and return the user

    try {
      if (address) {
        const addr = new this.addressModel(address);
        await addr.save();
        const newUser = await new this.userModel({
          ...user,
          address: addr._id,
        }).save();
        // throw error if user is not created
        console.log(newUser.errors, 'newUser.errors');
        return newUser.populate('address');
      } else {
        const newUser = await new this.userModel(user).save();
        // throw error if user is not created
        return newUser;
      }
    } catch (error) {
      // how to handle error as email unique or other unique fields
      console.log(error, 'error');
      return null;
    }
  }
  async updateUser(id: string, user: UpdateUserDto): Promise<object> {
    const users = await this.userModel.findByIdAndUpdate(id, user);
    return users;
  }

  async deleteUser(id: string): Promise<any> {
    // give message if user is deleted
    const userDeleted = await this.userModel.findByIdAndDelete(id);
    if (!userDeleted) {
      return null;
    }
    console.log(userDeleted, 'userDeleted');
    return userDeleted;
  }
}
