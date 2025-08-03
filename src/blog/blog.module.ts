import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog, BlogSchema } from './entities/blog.schema';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [BlogController],
  providers: [BlogService, AuthGuard, RolesGuard],
  exports: [BlogService],
})
export class BlogModule {}
