import { AuthGuard } from './../guards/jwt.guard';
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
 // Your AuthGuard implementation

import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard) // Apply AuthGuard only to this route
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
