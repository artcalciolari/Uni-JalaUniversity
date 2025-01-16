import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export enum RoomType {
  STANDARD = 'Standard',
  SUPERIOR = 'Superior',
  DELUXE = 'Deluxe',
  SUITES = 'Suites',
  SPECIAL_ROOMS = 'Special Room',
  EXCLUSIVE = 'Exclusive',
}

@Schema({ timestamps: true, collection: 'rooms' })
export class Room extends Document {
  @Prop({ required: true, trim: true, type: String })
  name: string;

  @Prop({ required: true, type: Number, default: 0 })
  roomNumber: number;

  @Prop({ required: true, type: Number, default: 0 })
  price: number;

  @Prop({ required: true, type: Number, default: 0 })
  capacity: number;

  @Prop({ required: true, trim: true, type: String, enum: RoomType })
  type: string;

  @Prop({ required: true, type: Boolean, default: false })
  isBooked: boolean;

  @Prop({
    required: true,
    trim: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
  })
  hotel: mongoose.Schema.Types.ObjectId;
}

export const RoomSchema = SchemaFactory.createForClass(Room);