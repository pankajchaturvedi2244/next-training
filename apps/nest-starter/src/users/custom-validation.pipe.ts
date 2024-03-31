import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // Apply ValidationPipe to validate other fields according to the DTO
    const validationPipe = new ValidationPipe();
    await validationPipe.transform(value, metadata);

    // Validate and transform date timestamp strings to Unix timestamps
    if (value && value.timeStamp) {
      const timestamp = new Date(value.timeStamp);
      console.log(timestamp, 'timestamp', value.timeStamp);

      if (isNaN(timestamp.getTime())) {
        throw new BadRequestException('Invalid date format for timestamp');
      }
      value.timeStamp = timestamp.getTime(); // Assuming dateOfBirth is the field to be transformed
    }

    return value;
  }
}
