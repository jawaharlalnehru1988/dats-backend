import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { BgSlokaModule } from './bg-sloka/bg-sloka.module';
import { BgSlokaChaptersModule } from './bg-sloka-chapters/bg-sloka-chapters.module';
import { RamBhajanModule } from './ram-bhajan/ram-bhajan.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://nehru00123:Soundarya1994@harekrishna.iaouzqs.mongodb.net/DATS?retryWrites=true&w=majority&appName=harekrishna',
    ),
    UserModule,
    BlogModule,
    BgSlokaModule,
    BgSlokaChaptersModule,
    RamBhajanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    try {
      await this.connection.asPromise();
      console.log('Database connected successfully');
    } catch (error: any) {
      console.error('Database connection failed:', (error as Error).message);
    }
  }
}
