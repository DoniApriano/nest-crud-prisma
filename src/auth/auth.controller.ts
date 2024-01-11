import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user/user.service';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      return await this.authService.authenticate(body.email, body.password);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Post('register')
  async register(@Body() body: Prisma.UserCreateInput) {
    try {
      return await this.userService.create(body);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
