import { AddressDto } from './address.dto';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  address: AddressDto;
}
