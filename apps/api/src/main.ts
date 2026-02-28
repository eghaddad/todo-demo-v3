import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Use PORT from environment (Railway requirement)
  const port = process.env.PORT || 3001;
  
  // CORS configuration
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  });
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  await app.listen(port);
  console.log(`🚀 API running on port ${port}`);
  console.log(`📊 Health check: http://localhost:${port}/api/health`);
}
bootstrap();
