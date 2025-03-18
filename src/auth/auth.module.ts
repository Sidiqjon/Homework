import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'enigma',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtAuthGuard], 
  controllers: [AuthController],
  exports: [AuthService, JwtModule, JwtAuthGuard], 
})
export class AuthModule {}
