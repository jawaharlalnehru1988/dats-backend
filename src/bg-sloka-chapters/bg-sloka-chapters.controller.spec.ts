import { Test, TestingModule } from '@nestjs/testing';
import { BgSlokaChaptersController } from './bg-sloka-chapters.controller';
import { BgSlokaChaptersService } from './bg-sloka-chapters.service';

describe('BgSlokaChaptersController', () => {
  let controller: BgSlokaChaptersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BgSlokaChaptersController],
      providers: [BgSlokaChaptersService],
    }).compile();

    controller = module.get<BgSlokaChaptersController>(BgSlokaChaptersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
