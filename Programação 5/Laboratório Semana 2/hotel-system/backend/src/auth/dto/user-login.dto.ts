import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({
    example: 'user@email.com',
    description: 'The email of the User that wants to login',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the User that wants to login',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
