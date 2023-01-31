import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {GoogleStrategy} from "./google.strategy";
import {PrismaService} from "./prisma.service";

@Module({
  imports: [PassportModule, JwtModule.register({
    secret: 'test',
    signOptions: {expiresIn: '360s'}
  })],
  controllers: [
      AuthController
  ],
  providers: [AuthService, PrismaService, GoogleStrategy],
  exports: [AuthService]
})
export class AuthModule {}
