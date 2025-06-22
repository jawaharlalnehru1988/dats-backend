import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import * as express from 'express';
import { Server } from 'http';

const expressApp = express();
let server: Server;

export default async function handler(req, res) {
  if (!server) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    await app.init();
    server = expressApp.listen();
  }
  expressApp(req, res);
}
