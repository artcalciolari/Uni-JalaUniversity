import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from '../rooms.schema';

export class CreateRoomDto {
  @ApiProperty({ example: 'Single Room', description: 'The name of the room.' })
  @IsString({ message: 'name must be a string.' })
  @IsNotEmpty({ message: 'name is required.' })
  name: string;

  @ApiProperty({ example: 101, description: 'The room number.' })
  @IsNumber({}, { message: 'room number must be a number.' })
  @IsNotEmpty()
  roomNumber: number;

  @ApiProperty({ example: 100, description: 'The price of the room.' })
  @IsNumber({}, { message: 'price must be a number.' })
  @IsNotEmpty({ message: 'price is required.' })
  price: number;

  @ApiProperty({ example: 1, description: 'The capacity of the room.' })
  @IsNumber({}, { message: 'capacity must be a number.' })
  @IsNotEmpty({ message: 'capacity is required.' })
  capacity: number;

  @ApiProperty({ example: 'Standard', description: 'The type of the room.' })
  @IsEnum(RoomType, { message: 'type must be a valid room type.' })
  @IsNotEmpty({ message: 'type is required.' })
  type: string;

  @ApiProperty({
    example: false,
    description: 'The booking status of the room.',
  })
  @IsBoolean({ message: 'isBooked must be a boolean.' })
  @IsNotEmpty({ message: 'isBooked is required.' })
  isBooked: boolean;

  @ApiProperty({
    example: 'Jala Hotel',
    description: 'The name of the hotel that the room belongs to.',
  })
  @IsString({ message: 'hotel name must be a string.' })
  @IsNotEmpty({ message: 'hotel name is required.' })
  hotelName: string;
}
