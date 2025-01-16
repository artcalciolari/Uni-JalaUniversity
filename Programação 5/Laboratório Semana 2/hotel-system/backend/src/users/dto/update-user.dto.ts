import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user that you wish to update (OPTIONAL).' })
  @IsString({ message: 'name must be a string.' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '123456', description: 'The password of the user that you wish to update (OPTIONAL).' })
  @IsString({ message: 'password must be a string.' })
  @IsOptional()
  password?: string;

  @ApiProperty({
    example: 'user@email.com',
    description: 'The email of the user that you wish to update (OPTIONAL).',
  })
  @IsEmail({}, { message: 'email must be a valid email.' })
  @IsOptional()
  email?: string;
}
