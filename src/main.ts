import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decorator가 없는 속성은 제거되어 저장
      forbidNonWhitelisted: true, // whitelist에 존재하지 않을 경우 속성을 제거하는 대신 HttpException
      transform: true, // 자동 형 변환
    }),
  );
  await app.listen(4000);
}
bootstrap();
