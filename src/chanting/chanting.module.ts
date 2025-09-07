import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChantingService } from './chanting.service';
import { ChantingController } from './chanting.controller';
import { Chanting, ChantingSchema } from './entities/chanting.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chanting.name, schema: ChantingSchema },
    ]),
  ],
  controllers: [ChantingController],
  providers: [ChantingService],
  exports: [ChantingService],
})
export class ChantingModule {}
