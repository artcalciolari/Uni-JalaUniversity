import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user.' })
  @IsString({ message: 'name must be a string.' })
  @IsNotEmpty({ message: 'name is required.' })
  name: string;

  @ApiProperty({ example: '123456', description: 'The password of the user.' })
  @IsString({ message: 'password must be a string.' })
  @IsNotEmpty({ message: 'password is required.' })
  password: string;

  @ApiProperty({
    example: 'user@email.com',
    description: 'The email of the user.',
  })
  @IsEmail({}, { message: 'email must be a valid email.' })
  @IsNotEmpty({ message: 'email is required.' })
  email: string;
}
