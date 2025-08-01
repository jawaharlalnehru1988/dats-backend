import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Use environment variable
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService, AuthGuard], // Export guards for use in other modules
})
export class UserModule {}
