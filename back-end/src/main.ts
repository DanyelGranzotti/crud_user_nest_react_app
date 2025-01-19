import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ColorsSeeder } from './modules/colors/colors.seeder';
import { UsersSeeder } from './modules/users/users.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('API for user management')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);

  const dataSource = app.get(DataSource);
  dataSource.isInitialized
    ? console.log('Database connection established')
    : console.log('Database connection failed');

  const colorsSeeder = app.get(ColorsSeeder);
  await colorsSeeder.seed();

  const usersSeeder = app.get(UsersSeeder);
  await usersSeeder.seed();
}
bootstrap();
