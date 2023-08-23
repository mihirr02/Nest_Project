import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(request.headers.cookie, ' accessToken');
    const accessToken = this.extractTokenValue(request.headers.cookie); // Extract token value // Change this to match your cookie name
    // console.log(accessToken,' accessToken')

    if (!accessToken) {
      throw new UnauthorizedException('Access token missing');
    }
    try {
      const decodedToken = this.jwtService.verify(accessToken); // Verify the token
      console.log(decodedToken,' decodedToken')
      request.user = decodedToken; // Store the decoded token in the request object
      return true; // Allow access
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
  private extractTokenValue(cookieValue: string): string | null {
    console.log(cookieValue, ' CookieValue');
    const tokenStartIndex = cookieValue.indexOf('=') + 1;
    return tokenStartIndex !== -1
      ? cookieValue.substring(tokenStartIndex)
      : null;
  }
}

// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { JwtService } from '@nestjs/jwt'; // Import the JwtService

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const accessToken = request.cookies['accessToken']; // Ensure this matches the cookie name

//     if (!accessToken) {
//       throw new UnauthorizedException('Access token missing'); // No token, deny access
//     }

//     try {
//       const decodedToken = this.jwtService.verify(accessToken); // Verify the token
//       request.user = decodedToken; // Store the decoded token in the request object
//       return true; // Allow access
//     } catch (error) {
//       throw new UnauthorizedException('Invalid access token'); // Token verification failed, deny access
//     }
//   }
// }
