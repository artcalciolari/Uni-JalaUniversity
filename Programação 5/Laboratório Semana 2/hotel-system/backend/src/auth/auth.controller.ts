import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { Public } from 'src/utils/constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiResponse({ status: 200, description: 'User authenticated.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async authenticateUser(@Body() UserLoginDto: UserLoginDto) {
    return this.authService.authenticateUser(UserLoginDto);
  }
}