import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from './hotels.schema';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { HotelResponseDto } from './dto/hotel-response.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name)
    private readonly hotelModel: Model<Hotel>,
  ) {}

  // Creates a hotel
  async createHotel(createHotelDto: CreateHotelDto): Promise<HotelResponseDto> {
    // Checks if hotel already exists using its name
    const hotelExists = await this.checkIfHotelExists(createHotelDto.name);

    if (hotelExists) {
      throw new BadRequestException('Hotel with this name already exists.');
    }

    const newHotel = await this.hotelModel.create(createHotelDto);
    newHotel.save();

    return this.createResponseDto(newHotel);
  }

  // Returns a list containing all hotels
  async getAllHotels(): Promise<HotelResponseDto[]> {
    const hotels = await this.hotelModel.find().exec();

    if (hotels.length === 0) {
      throw new NotFoundException('No hotels found.');
    }

    return hotels.map((hotel) => this.createResponseDto(hotel));
  }

  // Returns a hotel by id
  async getHotelById(id: string): Promise<HotelResponseDto> {
    const hotel = await this.hotelModel.findById(id).exec();
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${id} not found.`);
    }
    return this.createResponseDto(hotel);
  }

  // Returns a hotel by name
  async getHotelByName(name: string): Promise<HotelResponseDto> {
    const hotel = await this.hotelModel.findOne({ name }).exec();
    if (!hotel) {
      throw new NotFoundException(`Hotel with name ${name} not found.`);
    }
    return this.createResponseDto(hotel);
  }

  // Returns a list of hotels by location
  async getHotelsByLocation(location: string): Promise<HotelResponseDto[]> {
    const hotels = await this.hotelModel
      .find({ location: { $regex: location, $options: 'i' } })
      .exec();
    if (hotels.length === 0) {
      throw new NotFoundException(`No hotels found in ${location}.`);
    }
    return hotels.map((hotel) => this.createResponseDto(hotel));
  }

  // Updates a hotel by id
  async updateHotel(
    id: string,
    updateHotelDto: UpdateHotelDto,
  ): Promise<HotelResponseDto> {
    const updatedHotel = await this.hotelModel
      .findByIdAndUpdate(id, updateHotelDto, { new: true })
      .exec();

    if (!updatedHotel) {
      throw new NotFoundException(
        `Hotel with id ${id} not found. Unable to update.`,
      );
    }

    return this.createResponseDto(updatedHotel);
  }

  // Deletes a hotel by id
  async deleteHotel(id: string): Promise<void> {
    const result = await this.hotelModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(
        `Hotel with id ${id} not found. Unable to delete.`,
      );
    }
  }

  // Helper method to create a response DTO
  private createResponseDto(hotel: Hotel): HotelResponseDto {
    return new HotelResponseDto(
      hotel.id,
      hotel.name,
      hotel.description,
      hotel.location,
      hotel.averagePrice,
      hotel.rating,
      hotel.roomsAvailable,
    );
  }

  // Helper method to check if hotel exists using its name
  private async checkIfHotelExists(name: string): Promise<boolean> {
    const hotel = await this.hotelModel.findOne({ name }).exec();
    return !!hotel;
  }
}
