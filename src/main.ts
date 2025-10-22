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
  
  // Enable CORS with all origins access for open source
  app.enableCors({
    origin: '*', // Explicitly allow all origins for open source
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With', 'Access-Control-Request-Method', 'Access-Control-Request-Headers'],
    credentials: false, // Set to false when using origin: '*' for broader compatibility
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation available at: http://localhost:${port}/api`);
  console.log(`🌐 CORS enabled for all origins`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
