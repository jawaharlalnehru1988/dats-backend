import { Test, TestingModule } from '@nestjs/testing';
import { ChantingController } from './chanting.controller';
import { ChantingService } from './chanting.service';

describe('ChantingController', () => {
  let controller: ChantingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChantingController],
      providers: [ChantingService],
    }).compile();

    controller = module.get<ChantingController>(ChantingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
