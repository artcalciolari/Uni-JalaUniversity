export class RoomResponseDto {
  id: string;
  name: string;
  roomNumber: number;
  price: number;
  capacity: number;
  type: string;
  isBooked: boolean;
  hotelName: string;

  constructor(id: string, name: string, roomNumber:number, price: number, capacity: number, type: string, isBooked: boolean, hotelName: string) {
    this.id = id;
    this.name = name;
    this.roomNumber = roomNumber;
    this.price = price;
    this.capacity = capacity;
    this.type = type;
    this.isBooked = isBooked;
    this.hotelName = hotelName;
  }
}