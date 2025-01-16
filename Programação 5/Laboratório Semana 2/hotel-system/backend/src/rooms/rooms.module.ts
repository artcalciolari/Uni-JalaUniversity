import { Module } from '@nestjs/common';
import { HotelModule } from 'src/hotels/hotels.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './rooms.service';
import { RoomController } from './rooms.controller';
import { Room, RoomSchema } from './rooms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    HotelModule,
  ],
  providers: [RoomService],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomsModule {}
