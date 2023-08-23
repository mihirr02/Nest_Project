import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express'; // Import Response
import { AuthService } from './auth.service';
import * as cookie from 'cookie'; // Import the 'cookie' package

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body('username') username: string, @Body('password') password: string) {
    await this.authService.signUp(username, password);
    return { message: 'User registered successfully' };
  }

  @Post('signin')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const token = await this.authService.signIn(username, password);

    // Set the token in a cookie
    res.cookie('accessToken', token.accessToken, { httpOnly: true });

    return res.status(HttpStatus.OK).json({ accessToken: token.accessToken });
  }
}