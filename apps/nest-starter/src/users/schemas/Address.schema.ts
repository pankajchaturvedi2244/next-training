import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Address {
  @Prop({ required: true })
  address1: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: false })
  address2: string;

  @Prop({ required: true, default: 12345 })
  zip: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
