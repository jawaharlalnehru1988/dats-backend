import { Test, TestingModule } from '@nestjs/testing';
import { HarekrishnaPhilosophyController } from './harekrishna-philosophy.controller';
import { HarekrishnaPhilosophyService } from './harekrishna-philosophy.service';

describe('HarekrishnaPhilosophyController', () => {
  let controller: HarekrishnaPhilosophyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarekrishnaPhilosophyController],
      providers: [HarekrishnaPhilosophyService],
    }).compile();

    controller = module.get<HarekrishnaPhilosophyController>(HarekrishnaPhilosophyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
