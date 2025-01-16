import { IsString, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({
    example: 'Jala Hotel',
    description: 'The name of the hotel that room belongs to.',
  })
  @IsString({ message: 'hotel name must be a string.' })
  @IsNotEmpty()
  hotelName: string;

  @ApiProperty({ example: '101', description: 'The room number.' })
  @IsNumber({}, { message: 'room number must be a number.' })
  @IsNotEmpty()
  roomNumber: number;

  @ApiProperty({ example: '2025-01-01', description: 'The check-in date.' })
  @IsDateString({}, { message: 'check-in date must be a date string.' })
  @IsNotEmpty()
  checkIn: Date;

  @ApiProperty({ example: '2025-01-02', description: 'The check-out date.' })
  @IsDateString({}, { message: 'check-out date must be a date string.' })
  @IsNotEmpty()
  checkOut: Date;
}
