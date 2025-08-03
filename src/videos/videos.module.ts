import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { Video, VideoSchema } from './entities/video.entity';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [VideosController],
  providers: [VideosService, AuthGuard, RolesGuard],
  exports: [VideosService],
})
export class VideosModule {}
