import { Test, TestingModule } from '@nestjs/testing';
import { SecondProjectController } from './second-project.controller';
import { SecondProjectService } from './second-project.service';

describe('SecondProjectController', () => {
  let secondProjectController: SecondProjectController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SecondProjectController],
      providers: [SecondProjectService],
    }).compile();

    secondProjectController = app.get<SecondProjectController>(SecondProjectController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(secondProjectController.getHello()).toBe('Hello World!');
    });
  });
});
