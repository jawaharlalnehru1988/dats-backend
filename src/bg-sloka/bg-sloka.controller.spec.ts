import { Test, TestingModule } from '@nestjs/testing';
import { BgSlokaController } from './bg-sloka.controller';
import { BgSlokaService } from './bg-sloka.service';

describe('BgSlokaController', () => {
  let controller: BgSlokaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BgSlokaController],
      providers: [BgSlokaService],
    }).compile();

    controller = module.get<BgSlokaController>(BgSlokaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
