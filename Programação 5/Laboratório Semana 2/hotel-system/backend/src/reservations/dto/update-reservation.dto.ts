import {
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservationDto {
  @ApiProperty({
    example: 'Jala Hotel',
    description: 'The name of the hotel that room belongs to (OPTIONAL).',
  })
  @IsString({ message: 'hotelName must be a string.' })
  @IsOptional()
  hotelName?: string;

  @ApiProperty({ example: '101', description: 'The room number (OPTIONAL).' })
  @IsNumber({}, { message: 'room number must be a number.' })
  @IsOptional()
  roomNumber?: number;

  @ApiProperty({
    example: '2025-01-01',
    description: 'The check-in date (OPTIONAL).',
  })
  @IsDateString({}, { message: 'check-in date must be a date string.' })
  @IsOptional()
  checkIn?: Date;

  @ApiProperty({
    example: '2025-01-02',
    description: 'The check-out date (OPTIONAL).',
  })
  @IsDateString({}, { message: 'check-out date must be a date string.' })
  @IsOptional()
  checkOut?: Date;

  @ApiProperty({
    example: false,
    description: 'The cancellation status of the reservation (OPTIONAL).',
  })
  @IsBoolean({ message: 'isCancelled must be a boolean.' })
  @IsOptional()
  isCancelled?: boolean;

  @ApiProperty({
    example: '2025-01-02',
    description: 'The date of the cancellation (OPTIONAL).',
  })
  @IsDateString({}, { message: 'cancelledAt must be a date string.' })
  @IsOptional()
  cancelledAt?: Date;
}
