import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/guards/jwt.guard';
import { UserSchema, User } from './user.schema';
import { UserController } from './users.controller';
import { UserService } from './users.service';
const jwtConstants = {
  secret: 'mydevelopmentsecretkey',
};
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
})
export class UsersModule {}
