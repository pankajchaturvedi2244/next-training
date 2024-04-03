import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Address } from './Address.schema';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default: new Date().toISOString() })
  timeStamp: string;

  @Prop({ ref: 'Address', type: mongoose.Schema.Types.ObjectId })
  // giving address object Id as reference
  address: Address;
}
export const UserSchema = SchemaFactory.createForClass(User);
