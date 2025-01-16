import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'hotels' })
export class Hotel extends Document {
  @Prop({ required: true, trim: true, type: String })
  name: string;

  @Prop({ required: true, trim: true, type: String })
  description: string;

  @Prop({ required: true, trim: true, type: String })
  location: string;

  @Prop({ required: true, type: Number, default: 0 })
  averagePrice: number;

  @Prop({ required: true, type: Number, default: 0 })
  rating: number;

  @Prop({ required: true, type: Number, default: 10 })
  roomsAvailable: number;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);