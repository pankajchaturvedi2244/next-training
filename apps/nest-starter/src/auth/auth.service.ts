import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';

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
    const user = await this.usersService.getUserByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      console.log('result', result, password);
      const jwt = await this.jwtService.sign(result);
      return jwt;
    } else {
      return null;
    }
  }
}
