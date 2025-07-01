import { Test, TestingModule } from '@nestjs/testing';
import { BgSlokaChaptersService } from './bg-sloka-chapters.service';

describe('BgSlokaChaptersService', () => {
  let service: BgSlokaChaptersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BgSlokaChaptersService],
    }).compile();

    service = module.get<BgSlokaChaptersService>(BgSlokaChaptersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
