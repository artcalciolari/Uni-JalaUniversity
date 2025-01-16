import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-responde.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/utils/constants';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, description: 'User created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @ApiResponse({ status: 404, description: 'No users found.' })
  getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.getAllUsers();
  }

  @Get('id/:id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Return searched user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.getUserById(id);
  }

  @Get('name/:name')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get user by name' })
  @ApiResponse({ status: 200, description: 'Return searched user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  getUserByName(@Param('name') name: string): Promise<UserResponseDto> {
    return this.userService.getUserByName(name);
  }

  @Get('email/:email')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 200, description: 'Return searched user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  getUserByEmail(@Param('email') email: string): Promise<UserResponseDto> {
    return this.userService.getUserByEmail(email);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  updateUser(
    @Param('id') name: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(name, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  deleteUser(@Param('id') name: string): Promise<void> {
    return this.userService.deleteUser(name);
  }
}
