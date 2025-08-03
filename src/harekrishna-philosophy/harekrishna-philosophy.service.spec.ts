import { Test, TestingModule } from '@nestjs/testing';
import { HarekrishnaPhilosophyService } from './harekrishna-philosophy.service';

describe('HarekrishnaPhilosophyService', () => {
  let service: HarekrishnaPhilosophyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HarekrishnaPhilosophyService],
    }).compile();

    service = module.get<HarekrishnaPhilosophyService>(HarekrishnaPhilosophyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
