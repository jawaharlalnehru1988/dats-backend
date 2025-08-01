import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RamBhajanService } from './ram-bhajan.service';
import { RamBhajanController } from './ram-bhajan.controller';
import { RamBhajan, RamBhajanSchema } from './entities/ram-bhajan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RamBhajan.name, schema: RamBhajanSchema },
    ]),
  ],
  controllers: [RamBhajanController],
  providers: [RamBhajanService],
})
export class RamBhajanModule {}
