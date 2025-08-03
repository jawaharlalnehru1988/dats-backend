import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('BgSloka API')
    .setDescription('API documentation for BgSloka CRUD')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Enable CORS with all origins access
  app.enableCors({
    origin: true, // Allows all origins
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    credentials: true, // Allow cookies and authorization headers
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation available at: http://localhost:${port}/api`);
  console.log(`🌐 CORS enabled for all origins`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
