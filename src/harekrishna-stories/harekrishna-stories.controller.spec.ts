import { Test, TestingModule } from '@nestjs/testing';
import { HarekrishnaStoriesController } from './harekrishna-stories.controller';
import { HarekrishnaStoriesService } from './harekrishna-stories.service';

describe('HarekrishnaStoriesController', () => {
  let controller: HarekrishnaStoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarekrishnaStoriesController],
      providers: [HarekrishnaStoriesService],
    }).compile();

    controller = module.get<HarekrishnaStoriesController>(HarekrishnaStoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
