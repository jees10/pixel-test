import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) { }

  @Post('login')
  async login(
    @Body() body: { email: string, password: string }
  ) {
    const { email, password } = body;
    const user = await this.authService.login(email, password);

    if (!user) {
      throw new UnauthorizedException('Email or password invalid')
    }

    return user;
  }
}
