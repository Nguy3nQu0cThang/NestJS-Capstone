import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ACCESS_TOKEN_SECRET } from '../../../common/constant/app.constant';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ProtectStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly prisma:PrismaService) {
    console.log('ProtectStrategy initialized');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET || 'Chưa có Token',
    });
  }

  async validate(payload: any) {
    console.log('validate',{payload});
    const user=await this.prisma.users.findUnique({
      where:{
        id:payload.sub,
      }
    })
    if(!user) throw new UnauthorizedException("Tài khoản không hợp lệ");
    console.log({user});
    return user;
  }
}
