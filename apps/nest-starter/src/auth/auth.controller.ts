import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
// import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Req() req, @Body() payLoad: AuthDto) {
    const user = await this.authService.validateUser(payLoad);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid Credentials',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
