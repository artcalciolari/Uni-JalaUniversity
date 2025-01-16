import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHotelDto {
  @ApiProperty({ example: 'Hotel Name', description: 'The name of the hotel.' })
  @IsString({ message: 'name must be a string.' })
  @IsNotEmpty({ message: 'name is required.' })
  name: string;

  @ApiProperty({
    example: 'Hotel Description',
    description: 'The description of the hotel.',
  })
  @IsString({ message: 'description must be a string.' })
  @IsNotEmpty({ message: 'description is required.' })
  description: string;

  @ApiProperty({
    example: 'Hotel Location',
    description: 'The location of the hotel.',
  })
  @IsString({ message: 'location must be a string.' })
  @IsNotEmpty({ message: 'location is required.' })
  location: string;

  @ApiProperty({
    example: 100,
    description: 'The average price of a room in the hotel.',
  })
  @IsNumber({}, { message: 'averagePrice must be a number.' })
  @IsNotEmpty({ message: 'averagePrice is required.' })
  averagePrice: number;

  @ApiProperty({ example: 4.2, description: 'The rating of the hotel.' })
  @IsNumber({}, { message: 'rating must be a number.' })
  @IsNotEmpty({ message: 'rating is required.' })
  rating: number;

  @ApiProperty({
    example: 10,
    description: 'The number of rooms available in the hotel.',
  })
  @IsNumber({}, { message: 'roomsAvailable must be a number.' })
  @IsNotEmpty({ message: 'roomsAvailable is required.' })
  roomsAvailable: number;
}
