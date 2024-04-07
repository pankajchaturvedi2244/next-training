import { IsNotEmptyObject, IsObject, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import { AddressDto } from '@app/common/dto/address.dto';

export class UpdateUserDto extends CreateUserDto {
  id: number;

  @IsOptional()
  @Type(() => AddressDto)
  @IsObject()
  @IsNotEmptyObject()
  address: AddressDto;

  @IsOptional()
  lastName: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  email: string;
}
