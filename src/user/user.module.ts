import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'your_secret_key', // Replace with a secure secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
