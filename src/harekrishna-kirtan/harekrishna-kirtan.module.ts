import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { HarekrishnaKirtanService } from './harekrishna-kirtan.service';
import { HarekrishnaKirtanController } from './harekrishna-kirtan.controller';
import { HarekrishnaKirtan, HarekrishnaKirtanSchema } from './entities/harekrishna-kirtan.schema';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HarekrishnaKirtan.name, schema: HarekrishnaKirtanSchema }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [HarekrishnaKirtanController],
  providers: [HarekrishnaKirtanService, AuthGuard, RolesGuard],
  exports: [HarekrishnaKirtanService],
})
export class HarekrishnaKirtanModule {}
