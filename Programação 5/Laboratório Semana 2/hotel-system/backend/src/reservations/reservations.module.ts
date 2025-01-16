import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from 'src/rooms/rooms.module';
import { HotelModule } from 'src/hotels/hotels.module';
import { UsersModule } from 'src/users/users.module';
import { ReservationService } from './reservations.service';
import { ReservationController } from './reservations.controller';
import { Reservation, ReservationSchema } from './reservations.schema';
import { User } from 'src/users/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Reservation.name,
        schema: ReservationSchema,
      },
    ]),
    RoomsModule,
    HotelModule,
    UsersModule,
  ],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationsModule {}
