import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from '../rooms.schema';

export class UpdateRoomDto {
  @ApiProperty({
    example: 'Single Room',
    description: 'The name of the room that you wish to update (OPTIONAL).',
  })
  @IsString({ message: 'name must be a string.' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 101,
    description: 'The room number that you wish to update (OPTIONAL).',
  })
  @IsNumber({}, { message: 'room number must be a number.' })
  @IsOptional()
  roomNumber?: number;

  @ApiProperty({
    example: 100,
    description: 'The price of the room that you wish to update (OPTIONAL).',
  })
  @IsNumber({}, { message: 'price must be a number.' })
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 1,
    description: 'The capacity of the room that you wish to update (OPTIONAL).',
  })
  @IsNumber({}, { message: 'capacity must be a number.' })
  @IsOptional()
  capacity?: number;

  @ApiProperty({
    example: 'Standard',
    description: 'The type of the room that you wish to update (OPTIONAL).',
  })
  @IsEnum(RoomType, { message: 'type must be a valid room type.' })
  @IsOptional()
  type?: string;

  @ApiProperty({
    example: false,
    description:
      'The booking status of the room that you wish to update (OPTIONAL).',
  })
  @IsBoolean({ message: 'isBooked must be a boolean.' })
  @IsOptional()
  isBooked?: boolean;
}
