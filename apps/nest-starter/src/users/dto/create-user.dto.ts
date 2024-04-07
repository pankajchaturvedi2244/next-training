import {
  IsEmail,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from '@app/common/dto/address.dto';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  timeStamp: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  role: string;

  @ValidateNested()
  @Type(() => AddressDto)
  @IsObject()
  @IsNotEmptyObject()
  address: AddressDto;
}
