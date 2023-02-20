import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { UserController } from './controllers/user.controller';
import { ProductController } from './controllers/product.controller';

import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';

import UserRepository from './repositories/user.repository';
import ProductRepository from './repositories/product.repository';

import { ErrorsInterceptor } from './interceptors/app.interceptor';

@Module({
  imports: [],
  controllers: [UserController, ProductController],
  providers: [
    UserService,
    UserRepository,
    ProductService,
    ProductRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
