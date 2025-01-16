export class HotelResponseDto {
  id: string;
  name: string;
  description: string;
  location: string;
  averagePrice: number;
  rating: number;
  roomsAvailable: number;

  constructor(
    id: string,
    name: string,
    description: string,
    location: string,
    averagePrice: number,
    rating: number,
    roomsAvailable: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
    this.averagePrice = averagePrice;
    this.rating = rating;
    this.roomsAvailable = roomsAvailable;
  }
}
