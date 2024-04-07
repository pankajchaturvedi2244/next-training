import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/User.schema';
import { Address, AddressSchema } from '../users/schemas/Address.schema';
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://pankajisummation:M5uR0yb3gK0JE0xy@nestclustor01.yb5wquk.mongodb.net/`,
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
