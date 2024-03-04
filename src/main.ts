import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const configService: ConfigService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 5003;
  // // For Global Guards
  // const jwtService = app.get(JwtService);
  // app.useGlobalGuards(new JwtAuthGuard(jwtService));
  
  const config = new DocumentBuilder()
    // .addBearerAuth({
    //   type: 'http',
    //   scheme: 'bearer',
    //   bearerFormat: 'JWT',
    //   name: 'JWT',
    //   description: 'Enter JWT token',
    //   in: 'header'
    // },
    // 'access-token'
    // )
    .addBearerAuth()
    .setTitle('NestJS Relations')
    .setDescription('NestJS Relations API description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT);
}
bootstrap();
