import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

const SALT_PASSWORD = 12;

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(user: Prisma.UserCreateInput) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, SALT_PASSWORD);
    }

    const userData = await this.prismaService.user.create({
      data: user,
    });
    delete userData.password;
    return userData;
  }

  async findOne(user: { id?: string; email: string }) {
    const userData = await this.prismaService.user.findUnique({ where: user });
    if (!userData) return null;
    return userData;
  }

  async validateUser(email: string, password: string) {
    const user = await this.findOne({ email });
    if (!user) throw new UserNotFoundException();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AuthenticationFailedException();
    delete user.password;
    return user;
  }
}

class UserNotFoundException extends Error {
  name = 'UserNotFoundException';
  message = 'User Not Found';
}

class AuthenticationFailedException extends Error {
  name = 'AuthenticationFailedException';
  message = 'Email And Password Not Match';
}
