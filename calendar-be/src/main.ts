import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionHandlingInterceptor } from './common/decorators/error-handling.decorator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new ExceptionHandlingInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3002);
}
bootstrap();
