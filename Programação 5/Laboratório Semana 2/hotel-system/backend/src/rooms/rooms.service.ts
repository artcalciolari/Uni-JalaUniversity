import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './rooms.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomResponseDto } from './dto/room-response.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { HotelService } from 'src/hotels/hotels.service';
import { UpdateHotelDto } from 'src/hotels/dto/update-hotel.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name)
    private readonly roomModel: Model<Room>,
    private readonly hotelService: HotelService,
  ) {}

  // Creates a room and binds it to a existing hotel
  async createRoom(createRoomDto: CreateRoomDto): Promise<RoomResponseDto> {
    // check if the name provided belongs to a hotel present in the database
    const hotel = await this.hotelService.getHotelByName(
      createRoomDto.hotelName,
    );

    if (!hotel) {
      throw new NotFoundException(
        `No hotel with name ${createRoomDto.hotelName} found. Unable to create room.`,
      );
    }

    // check if room already exists using its room number
    const roomExists = await this.checkIfRoomExists(createRoomDto.roomNumber);

    if (roomExists) {
      throw new BadRequestException(
        `Room with number ${createRoomDto.roomNumber} already exists. Unable to create room.`,
      );
    }

    if (hotel.roomsAvailable === 0) {
      throw new BadRequestException('No rooms available in the hotel.');
    }

    const newRoom = await this.roomModel.create({
      ...createRoomDto,
      hotel: hotel.id,
    });
    newRoom.save();

    // change the amount of rooms available in given hotel after creating a new room
    const updatedHotel: UpdateHotelDto = {
      ...hotel,
      roomsAvailable: hotel.roomsAvailable - 1,
    };
    await this.hotelService.updateHotel(hotel.id, updatedHotel);

    return this.createResponseDto(newRoom, hotel.name);
  }

  // Get a room by id
  async getRoomById(id: string): Promise<RoomResponseDto> {
    const room = await this.roomModel.findById(id).exec();

    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found.`);
    }

    const hotel = await this.hotelService.getHotelById(room.hotel.toString());

    return this.createResponseDto(room, hotel.name);
  }

  // Returns a list containing all rooms belonging to a certain hotel
  async getRoomsByHotelName(hotelName: string): Promise<RoomResponseDto[]> {
    const hotel = await this.hotelService.getHotelByName(hotelName);

    if (!hotel) {
      throw new NotFoundException(
        `No hotel with name ${hotelName} found. Unable to get rooms.`,
      );
    }

    const rooms = await this.roomModel.find({ hotel: hotel.id }).exec();

    if (rooms.length === 0) {
      throw new NotFoundException('No rooms found.');
    }

    return rooms.map((room) => this.createResponseDto(room, hotel.name));
  }

  // Returns a list containing all rooms of a certain type in the hotel specified
  async getRoomsByType(
    hotelName: string,
    type: string,
  ): Promise<RoomResponseDto[]> {
    const hotel = await this.hotelService.getHotelByName(hotelName);

    if (!hotel) {
      throw new NotFoundException(
        `No hotel with name ${hotelName} found. Unable to get rooms.`,
      );
    }

    const rooms = await this.roomModel.find({ hotel: hotel.id, type }).exec();

    if (rooms.length === 0) {
      throw new NotFoundException(`No ${type} rooms found.`);
    }

    return rooms.map((room) => this.createResponseDto(room, hotel.name));
  }

  // Returns a room using it's number
  // by the reservation service to get the full room details
  async getRoomByRoomNumber(roomNumber: number): Promise<Room> {
    const room = await this.roomModel.findOne({ roomNumber }).exec();

    if (!room) {
      throw new NotFoundException(`Room with number ${roomNumber} not found.`);
    }

    return room;
  }

  // Checks if the room is booked
  async isRoomBooked(roomNumber: number): Promise<boolean> {
    const room = await this.getRoomByRoomNumber(roomNumber);

    return room.isBooked;
  }

  // Updates a room by id
  async updateRoom(
    id: string,
    updateRoomDto: UpdateRoomDto,
  ): Promise<RoomResponseDto> {
    const updatedRoom = await this.roomModel
      .findByIdAndUpdate(id, updateRoomDto, { new: true })
      .exec();

    if (!updatedRoom) {
      throw new NotFoundException(
        `Room with id ${id} not found. Unable to update.`,
      );
    }

    const hotel = await this.hotelService.getHotelById(
      updatedRoom.hotel.toString(),
    );
    return this.createResponseDto(updatedRoom, hotel.name);
  }

  // Deletes a room by id
  async deleteRoom(id: string): Promise<void> {
    const room = await this.roomModel.findByIdAndDelete(id).exec();

    if (!room) {
      throw new NotFoundException(
        `Room with id ${id} not found. Unable to delete.`,
      );
    }

    // change the amount of rooms available in given hotel after deleting a room
    const hotel = await this.hotelService.getHotelById(room.hotel.toString());
    const updatedHotel: UpdateHotelDto = {
      ...hotel,
      roomsAvailable: hotel.roomsAvailable + 1,
    };
    await this.hotelService.updateHotel(hotel.id, updatedHotel);
  }

  // Helper function to check if a room already exists using its room number
  private async checkIfRoomExists(roomNumber: number): Promise<boolean> {
    const room = await this.roomModel.findOne({ roomNumber }).exec();
    return !!room;
  }

  // Helper method to create a response DTO
  private createResponseDto(room: Room, hotelName: string): RoomResponseDto {
    return new RoomResponseDto(
      room.id,
      room.name,
      room.roomNumber,
      room.price,
      room.capacity,
      room.type,
      room.isBooked,
      hotelName,
    );
  }
}
