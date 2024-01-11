import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async authenticate(email: string, password: string) {
    try {
      const user = await this.userService.validateUser(email, password);
      const token = jwt.sign({ uid: user.id }, process.env.SECRET_JWT, {
        expiresIn: '7d',
      });

      return { token };
    } catch (err) {
        throw err;
    }
  }
}
