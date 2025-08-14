import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Tìm user theo email
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Email không tồn tại');
    }

    // 2. So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }

    // 3. Tạo payload và accessToken
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Đăng nhập thành công',
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(dto: RegisterDto) {
  const { name, email, password } = dto;

  // 1. Check email trùng
  const existingUser = await this.prisma.users.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email đã được đăng ký');
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Tạo user mới
  const newUser = await this.prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'USER',
    },
  });

  return {
    message: 'Đăng ký thành cong',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  };
}
}
