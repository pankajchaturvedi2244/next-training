/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: { username: string; password: string }) {
    const payload = { user: user, sub: 1 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser({ email, password }: AuthDto): Promise<any> {
    const hashedPassword = password;

    const user = await this.usersService.getUserByEmail(email);
    const isMatch = await bcrypt.compare(hashedPassword, user.password);
    console.log('isMatch', isMatch, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;

      const jwt = await this.jwtService.sign(result);
      // delete user.password and return user and jwt
      const updatedUser = { ...result._doc, access_token: jwt };
      delete updatedUser.password;
      return updatedUser;
    } else {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
