import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as session from "express-session"
import * as passport from "passport"

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  app.use(
      session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
      })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  const config = new DocumentBuilder()
      .setTitle('Netology - Дипломный проект')
      .setDescription('API бронирования гостиниц')
      .addCookieAuth('connect.sid')
      .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
