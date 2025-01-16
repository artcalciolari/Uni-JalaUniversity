export class ReservationResponseDto {
  id: string;
  hotelName: string;
  roomNumber: number;
  userName: string;
  checkIn: Date;
  checkOut: Date;
  isCancelled: boolean;
  cancelledAt: Date;

  constructor(
    id: string,
    hotelName: string,
    roomNumber: number,
    userName: string,
    checkIn: Date,
    checkOut: Date,
    isCancelled: boolean,
    cancelledAt: Date,
  ) {
    this.id = id;
    this.hotelName = hotelName;
    this.roomNumber = roomNumber;
    this.userName = userName;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.isCancelled = isCancelled;
    this.cancelledAt = cancelledAt;
  }
}
