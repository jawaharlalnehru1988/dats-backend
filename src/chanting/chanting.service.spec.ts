import { Test, TestingModule } from '@nestjs/testing';
import { ChantingService } from './chanting.service';

describe('ChantingService', () => {
  let service: ChantingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChantingService],
    }).compile();

    service = module.get<ChantingService>(ChantingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
