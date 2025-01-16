
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, collection: 'reservations' })
export class Reservation extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' })
  hotel: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
  room: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: Date })
  checkIn: Date;

  @Prop({ required: true, type: Date })
  checkOut: Date;

  @Prop({ required: true, type: Boolean, default: false })
  isCancelled: boolean;

  @Prop({ required: false, type: Date, default: null })
  cancelledAt: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);