import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BgSlokaService } from './bg-sloka.service';
import { BgSlokaController } from './bg-sloka.controller';
import { BgSloka, BgSlokaSchema } from './entities/sloka.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BgSloka.name, schema: BgSlokaSchema }])
  ],
  controllers: [BgSlokaController],
  providers: [BgSlokaService],
})
export class BgSlokaModule {}