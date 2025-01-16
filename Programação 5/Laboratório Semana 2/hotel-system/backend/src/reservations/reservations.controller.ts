import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationResponseDto } from './dto/reservation-response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { Reservation } from './reservations.schema';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create a reservation' })
  @ApiResponse({ status: 201, description: 'Reservation created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  createReservation(
    @Body() createReservationDto: CreateReservationDto,
    @Req() req: Request,
  ): Promise<ReservationResponseDto> {
    return this.reservationService.createReservation(createReservationDto, req);
  }

  @Get('hotelName/:hotelName')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get reservations by hotel name' })
  @ApiResponse({ status: 200, description: 'Return searched reservations.' })
  @ApiResponse({ status: 404, description: 'Reservations not found.' })
  getReservationsByHotelName(
    @Param('hotelName') hotelName: string,
  ): Promise<ReservationResponseDto[]> {
    return this.reservationService.getReservationsByHotelName(hotelName);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update a reservation' })
  @ApiResponse({ status: 200, description: 'Reservation updated.' })
  @ApiResponse({ status: 404, description: 'Reservation not found.' })
  updateReservation(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationResponseDto> {
    return this.reservationService.updateReservation(id, updateReservationDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete a reservation' })
  @ApiResponse({ status: 200, description: 'Reservation deleted.' })
  @ApiResponse({ status: 404, description: 'Reservation not found.' })
  deleteReservation(@Param('id') id: string): Promise<void> {
    return this.reservationService.deleteReservation(id);
  }
}
