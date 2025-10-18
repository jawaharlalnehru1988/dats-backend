import { Test, TestingModule } from '@nestjs/testing';
import { SlokaSearchController } from './sloka-search.controller';
import { SlokaSearchService } from './sloka-search.service';

describe('SlokaSearchController', () => {
  let controller: SlokaSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlokaSearchController],
      providers: [SlokaSearchService],
    }).compile();

    controller = module.get<SlokaSearchController>(SlokaSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
