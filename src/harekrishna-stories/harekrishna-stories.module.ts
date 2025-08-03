import { Module } from '@nestjs/common';
import { HarekrishnaStoriesService } from './harekrishna-stories.service';
import { HarekrishnaStoriesController } from './harekrishna-stories.controller';

@Module({
  controllers: [HarekrishnaStoriesController],
  providers: [HarekrishnaStoriesService],
})
export class HarekrishnaStoriesModule {}
