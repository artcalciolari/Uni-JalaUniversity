import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-responde.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  // Creates a user
  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const hashRounds = 10;

    // Check if user already exists using his email
    const userExists = await this.checkIfUserExists(createUserDto.email);

    if (userExists) {
      throw new BadRequestException('User with this email already exists.');
    }

    const newUser = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, hashRounds),
    };

    const createdUser = await this.userModel.create(newUser);
    createdUser.save();

    return this.createResponseDto(createdUser);
  }

  // Returns a list containing all users
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find().exec();

    if (users.length === 0) {
      throw new NotFoundException('No users found.');
    }

    return users.map((user) => this.createResponseDto(user));
  }

  // Returns a user by id
  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return this.createResponseDto(user);
  }

  // Returns a user by name
  async getUserByName(name: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ name }).exec();

    if (!user) {
      throw new NotFoundException(`User with name ${name} not found.`);
    }

    return new UserResponseDto(user.id, user.name, user.email, user.role);
  }

  // Returns a user by email
  async getUserByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }

    return this.createResponseDto(user);
  }

  // Updates a user by id
  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(
        `User with name ${id} not found. Unable to update.`,
      );
    }

    return this.createResponseDto(updatedUser);
  }

  // Deletes a user by id
  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(
        `User with name ${id} not found. Unable to delete.`,
      );
    }
  }

  // Function to return the full object of a user, given an email
  // This is used by the auth service to authenticate a user
  async getUserByEmailForAuth(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  // Helper method to create a response DTO
  private createResponseDto(user: User): UserResponseDto {
    return new UserResponseDto(user.id, user.name, user.email, user.role);
  }

  // Helper method to see if a user exists with a given email
  private async checkIfUserExists(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();
    return !!user;
  }
}
