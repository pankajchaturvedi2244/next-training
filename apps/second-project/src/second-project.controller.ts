import { Controller, Get } from '@nestjs/common';
import { SecondProjectService } from './second-project.service';

@Controller()
export class SecondProjectController {
  constructor(private readonly secondProjectService: SecondProjectService) {}

  @Get()
  getHello(): string {
    return this.secondProjectService.getHello();
  }
}
