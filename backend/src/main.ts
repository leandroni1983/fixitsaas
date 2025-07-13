import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  app.useGlobalPipes(
  new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }))


  const config = new DocumentBuilder()
    .setTitle('FizxIt SaaS API')
    .setDescription('Backend API for FizxIt SaaS application')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Endpoints de autenticación')
    .addTag('users', 'Gestión de usuarios')
    .addTag('orders', 'Gestión de órdenes')
    .addTag('companies', 'Gestión de empresas')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [UsersModule, OrdersModule,CompaniesModule,AuthModule],
  });
  SwaggerModule.setup('api', app, document,{
        swaggerOptions: {
      tagsSorter: 'auth,users,companies,orders',
    },
  })

  await app.listen(process.env.PORT ?? 3001);
}



bootstrap();
