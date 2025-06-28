import { Test, TestingModule } from '@nestjs/testing';
import { BgSlokaService } from './bg-sloka.service';

describe('BgSlokaService', () => {
  let service: BgSlokaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BgSlokaService],
    }).compile();

    service = module.get<BgSlokaService>(BgSlokaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
