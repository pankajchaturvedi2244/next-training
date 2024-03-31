import { NestFactory } from '@nestjs/core';
import { SecondProjectModule } from './second-project.module';

async function bootstrap() {
  const app = await NestFactory.create(SecondProjectModule);
  await app.listen(3000);
}
bootstrap();
