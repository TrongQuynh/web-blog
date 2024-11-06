import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PREFIX = 'api';
  const SERVICE_NAME = process.env.npm_package_name.toUpperCase();
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
    }),
  );

  app.setGlobalPrefix(PREFIX);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(`${SERVICE_NAME} Service ${process.env.CONFIG_BUILD_TIME}`)
    .setDescription(`The ${SERVICE_NAME} Service API description`)
    .setVersion(process.env.CONFIG_BUILD_NUMBER)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(PREFIX, app, document);

  await app.listen(process.env.SERVER_PORT);
  console.log(`Application is running on: ${await app.getUrl()}/${PREFIX}`);
}
bootstrap();
