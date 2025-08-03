import { Test, TestingModule } from '@nestjs/testing';
import { HarekrishnaStoriesService } from './harekrishna-stories.service';

describe('HarekrishnaStoriesService', () => {
  let service: HarekrishnaStoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HarekrishnaStoriesService],
    }).compile();

    service = module.get<HarekrishnaStoriesService>(HarekrishnaStoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
