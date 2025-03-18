import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { CategoryModule } from './categories/categories.module';
import { ProductModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/role-based.guard';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from './upload/upload.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.DB_PATH}`),
    UserModule, CategoryModule, ProductModule, AuthModule, UploadModule],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,  
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,  
    // },
  ],
})
export class AppModule {}
