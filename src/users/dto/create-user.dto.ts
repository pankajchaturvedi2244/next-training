import {
  IsEmail,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from '../../../libs/common/src/dto/address.dto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @ValidateNested()
  @Type(() => AddressDto)
  @IsObject()
  @IsNotEmptyObject()
  address: AddressDto;
}
