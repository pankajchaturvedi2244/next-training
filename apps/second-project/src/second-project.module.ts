import { Module } from '@nestjs/common';
import { SecondProjectController } from './second-project.controller';
import { SecondProjectService } from './second-project.service';

@Module({
  imports: [],
  controllers: [SecondProjectController],
  providers: [SecondProjectService],
})
export class SecondProjectModule {}
