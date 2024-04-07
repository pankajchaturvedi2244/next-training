import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  // constructor(private readonly userService: UsersService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    // Apply ValidationPipe to validate other fields according to the DTO
    const validationPipe = new ValidationPipe();
    await validationPipe.transform(value, metadata);
    // Validate and transform date timestamp strings to Unix timestamps
    if (value && value.timeStamp) {
      const timestamp = new Date(value.timeStamp);

      if (isNaN(timestamp.getTime())) {
        throw new BadRequestException('Invalid date format for timestamp');
      }
      value.timeStamp = timestamp.getTime(); // Assuming dateOfBirth is the field to be transformed
    }
    if (value && value.password) {
      if (value.password.length < 4) {
        throw new BadRequestException(
          'Password must be at least 4 characters long',
        );
      } else {
        // hash the password
        const hashedPassword = await bcrypt.hash(value.password, 10);
        value.password = hashedPassword;
      }
    }
    // check for unique email to do

    // const user = await this.userService.getUserByEmail(value.email);
    // if (user) {
    //   throw new BadRequestException('Email already exists');
    // }
    return value;
  }
}
