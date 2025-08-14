import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/logging.interceptor';
import { ProtectGuard } from './modules/auth/guards/protect.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Logger setup
  const logger = new Logger('Bootstrap');


  
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Get Reflector for Guards
  const reflector = app.get(Reflector);

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  // Global Interceptors (custom response format)
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Global Guards (JWT auth)
  app.useGlobalGuards(new ProtectGuard(reflector));

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Airbnb Clone API')
    .setDescription('API Documentation for Airbnb Capstone Project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    logger.log(` Server running at http://localhost:${PORT}`);
    logger.log(` Swagger docs at http://localhost:${PORT}/api-docs`);
  });
}

bootstrap();
