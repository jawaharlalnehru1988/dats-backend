import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { BgSlokaChaptersService } from './bg-sloka-chapters.service';
import { BgSlokaChaptersController } from './bg-sloka-chapters.controller';
import {
  BgSlokaChapter,
  BgSlokaChapterSchema,
} from './entities/bg-sloka-chapter.schema';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BgSlokaChapter.name, schema: BgSlokaChapterSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [BgSlokaChaptersController],
  providers: [BgSlokaChaptersService, AuthGuard],
})
export class BgSlokaChaptersModule {}
