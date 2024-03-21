import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDto {
  // city is a required field
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  address1: string;

  @IsString()
  address2: string;

  @IsString()
  zip: string;
}
