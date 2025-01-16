import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHotelDto {
  @ApiProperty({
    example: 'Hotel Name',
    description: 'The name of the hotel that you wish to update (OPTIONAL).',
  })
  @IsString({ message: 'name must be a string.' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Hotel Description',
    description:
      'The description of the hotel that you wish to update (OPTIONAL).',
  })
  @IsString({ message: 'description must be a string.' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'Hotel Location',
    description:
      'The location of the hotel that you wish to update (OPTIONAL).',
  })
  @IsString({ message: 'location must be a string.' })
  @IsOptional()
  location?: string;

  @ApiProperty({
    example: 100,
    description:
      'The average price of a room in the hotel that you wish to update (OPTIONAL).',
  })
  @IsNumber({}, { message: 'averagePrice must be a number.' })
  @IsOptional()
  averagePrice?: number;

  @ApiProperty({
    example: 4.2,
    description: 'The rating of the hotel that you wish to update (OPTIONAL).',
  })
  @IsNumber({}, { message: 'rating must be a number.' })
  @IsOptional()
  rating?: number;

  @ApiProperty({
    example: 10,
    description:
      'The number of rooms available in the hotel that you wish to update (OPTIONAL).',
  })
  @IsNumber({}, { message: 'roomsAvailable must be a number.' })
  @IsOptional()
  roomsAvailable?: number;
}
