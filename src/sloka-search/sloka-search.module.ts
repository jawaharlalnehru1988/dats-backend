import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SlokaSearchService } from './sloka-search.service';
import { SlokaSearchController } from './sloka-search.controller';
import { SlokaSearch, SlokaSearchSchema } from './entities/sloka-search.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SlokaSearch.name, schema: SlokaSearchSchema }
    ])
  ],
  controllers: [SlokaSearchController],
  providers: [SlokaSearchService],
  exports: [SlokaSearchService],
})
export class SlokaSearchModule {}
