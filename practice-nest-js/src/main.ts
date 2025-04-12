import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      // The whitelist option removes properties that do not have decorators in the DTO class.
      forbidNonWhitelisted: true,
      // The forbidNonWhitelisted option throws an error if non-whitelisted properties are found.
      transform: true,
      // The transform option automatically transforms payloads to be objects typed according to their DTO classes.
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
