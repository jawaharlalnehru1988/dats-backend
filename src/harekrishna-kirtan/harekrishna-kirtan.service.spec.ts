import { Test, TestingModule } from '@nestjs/testing';
import { HarekrishnaKirtanService } from './harekrishna-kirtan.service';

describe('HarekrishnaKirtanService', () => {
  let service: HarekrishnaKirtanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HarekrishnaKirtanService],
    }).compile();

    service = module.get<HarekrishnaKirtanService>(HarekrishnaKirtanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
