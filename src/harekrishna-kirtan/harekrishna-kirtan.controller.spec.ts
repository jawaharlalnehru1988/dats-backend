import { Test, TestingModule } from '@nestjs/testing';
import { HarekrishnaKirtanController } from './harekrishna-kirtan.controller';
import { HarekrishnaKirtanService } from './harekrishna-kirtan.service';

describe('HarekrishnaKirtanController', () => {
  let controller: HarekrishnaKirtanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarekrishnaKirtanController],
      providers: [HarekrishnaKirtanService],
    }).compile();

    controller = module.get<HarekrishnaKirtanController>(HarekrishnaKirtanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
