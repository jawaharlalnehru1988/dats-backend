import { Test, TestingModule } from '@nestjs/testing';
import { SlokaSearchService } from './sloka-search.service';

describe('SlokaSearchService', () => {
  let service: SlokaSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlokaSearchService],
    }).compile();

    service = module.get<SlokaSearchService>(SlokaSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
