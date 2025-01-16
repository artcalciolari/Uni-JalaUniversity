import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { getConnectionToken } from '@nestjs/mongoose';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Hotel Reservation System API')
    .setDescription('API documentation for the Hotel Reservation System')
    .setVersion('1.2')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Checks if we can connect to the cluster before fully initializing the application
  try {
    const mongooseConnection = app.get(getConnectionToken());
    await mongooseConnection.asPromise();

    console.log('Database connected.\nInitializing the application...');
  } catch (error) {
    console.error('Error while trying to connect to the database.', error);
  }

  // Applies validation to all routes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
