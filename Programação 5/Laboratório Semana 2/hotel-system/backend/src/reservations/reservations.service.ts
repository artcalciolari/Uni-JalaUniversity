import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './reservations.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationResponseDto } from './dto/reservation-response.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { RoomService } from 'src/rooms/rooms.service';
import { HotelService } from 'src/hotels/hotels.service';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<Reservation>,
    private readonly roomService: RoomService,
    private readonly hotelService: HotelService,
    private readonly userService: UsersService,
  ) {}

  // Creates a reservation, and binds it to an existing hotel, room, and user
  async createReservation(
    createReservationDto: CreateReservationDto,
    req: Request,
  ): Promise<ReservationResponseDto> {
    // Gets user ID from the decrypted token
    const userId = req['user'].id;

    // check if the room is already booked
    const isBooked = await this.roomService.isRoomBooked(
      createReservationDto.roomNumber,
    );

    let newReservation;

    if (isBooked) {
      throw new BadRequestException(
        `Room ${createReservationDto.roomNumber} in ${createReservationDto.hotelName} is already booked.`,
      );
    } else {
      const roomToBeBooked = await this.roomService.getRoomByRoomNumber(
        createReservationDto.roomNumber,
      );
      roomToBeBooked.isBooked = true;

      const roomInHotel = await this.hotelService.getHotelByName(
        createReservationDto.hotelName,
      );

      newReservation = new this.reservationModel({
        hotel: roomInHotel.id,
        room: roomToBeBooked.id,
        user: userId,
        ...createReservationDto,
      });

      await roomToBeBooked.save();
      await newReservation.save();
    }

    const userName = req['user'].name;
    return this.createResponseDto(
      newReservation,
      createReservationDto.hotelName,
      createReservationDto.roomNumber,
      userName,
    );
  }

  // Returns a list with all reservations in a given hotel
  async getReservationsByHotelName(
    hotelName: string,
  ): Promise<ReservationResponseDto[]> {
    const hotel = await this.hotelService.getHotelByName(hotelName);
    const reservations = await this.reservationModel
      .find({ hotel: hotel.id })
      .exec();

    if (!reservations) {
      throw new NotFoundException(
        `No reservations found for hotel ${hotelName}.`,
      );
    }

    const reservationWithDetails = await Promise.all(
      reservations.map(async (reservation) => {
        const room = await this.roomService.getRoomById(
          reservation.room.toString(),
        );
        const user = await this.userService.getUserById(
          reservation.user.toString(),
        );

        return this.createResponseDto(
          reservation,
          hotel.name,
          room.roomNumber,
          user.name,
        );
      }),
    );

    return reservationWithDetails;
  }

  // Updates a reservation
  async updateReservation(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationResponseDto> {
    const reservation = await this.reservationModel.findById(id).exec();

    if (!reservation) {
      throw new NotFoundException(
        `Reservation with id ${id} not found. Unable to update.`,
      );
    }

    const updatedReservation = await this.reservationModel
      .findByIdAndUpdate(
        id,
        { ...updateReservationDto, updatedAt: new Date() },
        { new: true },
      )
      .exec();

    const room = await this.roomService.getRoomById(
      updatedReservation.room.toString(),
    );
    const user = await this.userService.getUserById(
      updatedReservation.user.toString(),
    );
    const hotel = await this.hotelService.getHotelById(
      updatedReservation.hotel.toString(),
    );

    return this.createResponseDto(
      updatedReservation,
      hotel.name,
      room.roomNumber,
      user.name,
    );
  }

  // Deletes a reservation by id
  async deleteReservation(id: string): Promise<void> { 
    const reservation = await this.reservationModel.findById(id).exec();

    if (!reservation) {
      throw new NotFoundException(
        `Reservation with id ${id} not found. Unable to delete.`,
      );
    }

    const room = await this.roomService.getRoomById(
      reservation.room.toString(),
    );

    await this.roomService.updateRoom(room.id, { isBooked: false });

    const user = await this.userService.getUserById(
      reservation.user.toString(),
    );
    const hotel = await this.hotelService.getHotelById(
      reservation.hotel.toString(),
    );

    await this.reservationModel.findByIdAndDelete(id).exec();
  }

  // Helper method to create a response DTO
  private async createResponseDto(
    reservation: Reservation,
    hotelName: string,
    roomNumber: number,
    userName: string,
  ): Promise<ReservationResponseDto> {
    return new ReservationResponseDto(
      reservation.id,
      hotelName,
      roomNumber,
      userName,
      reservation.checkIn,
      reservation.checkOut,
      reservation.isCancelled,
      reservation.cancelledAt,
    );
  }
}
