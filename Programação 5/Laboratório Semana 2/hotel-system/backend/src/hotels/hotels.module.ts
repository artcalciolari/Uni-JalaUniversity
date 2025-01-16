import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelService } from './hotels.service';
import { HotelController } from './hotels.controller';
import { Hotel, HotelSchema } from './hotels.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
  ],
  providers: [HotelService],
  controllers: [HotelController],
  exports: [HotelService],
})
export class HotelModule {}
