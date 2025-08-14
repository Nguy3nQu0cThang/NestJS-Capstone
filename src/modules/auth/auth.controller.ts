import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from 'src/common/decorator/is-public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProtectGuard } from './guards/protect.guard';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(ProtectGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập người dùng' })
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công' })
  @ApiResponse({ status: 401, description: 'Sai email hoặc mật khẩu' })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Đăng ký người dùng mới' })
  @ApiResponse({ status: 201, description: 'Đăng ký thành công' })
  @ApiResponse({ status: 400, description: 'Email đã tồn tại' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
