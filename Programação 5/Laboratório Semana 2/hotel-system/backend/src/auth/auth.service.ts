import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticateUser(
    userLoginDto: UserLoginDto,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.getUserByEmailForAuth(userLoginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    if (!this.isPasswordValid(userLoginDto.password, user.password)) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    // I've chosen to inclue both the ID and the email in the payload
    // because querying with the ID is safer IMO.
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.signToken(payload),
    };
  }

  // Helper method to compare a password to a hash stored in the database
  private isPasswordValid(password: string, hashedPassword: string): boolean {
    return bcrypt.compare(password, hashedPassword);
  }

  // Helper method to sign the JWT token with the user data
  private async signToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
