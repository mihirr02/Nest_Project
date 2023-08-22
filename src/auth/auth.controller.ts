import { Controller, Post, Body } from '@nestjs/common'; // Remove Request import
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body('username') username: string, @Body('password') password: string) {
    await this.authService.signUp(username, password);
    return { message: 'User registered successfully' };
  }

  @Post('signin')
  async signIn(@Body('username') username: string, @Body('password') password: string) {
    const token = await this.authService.signIn(username, password);
    return { accessToken: token.accessToken };
  }
}
