import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User',
}

@Schema({ timestamps: true, collection: 'users' })
export class User extends Document {
  @Prop({ required: true, trim: true, type: String })
  name: string;

  @Prop({ required: true, trim: true, type: String })
  email: string;

  @Prop({ required: true, trim: true, type: String })
  password: string;

  @Prop({
    required: true,
    trim: true,
    enum: UserRole,
    type: String,
    default: UserRole.USER,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
