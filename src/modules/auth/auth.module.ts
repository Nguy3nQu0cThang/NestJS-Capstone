import { ACCESS_TOKEN_SECRET } from './../../common/constant/app.constant';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from './../prisma/prisma.module';
import { ProtectGuard } from './guards/protect.guard';
import { ProtectStrategy } from './guards/protect.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,ProtectStrategy, ProtectGuard],
  exports: [AuthService],
})
export class AuthModule {}
