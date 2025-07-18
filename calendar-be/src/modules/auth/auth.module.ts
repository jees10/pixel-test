import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { DataProvidersModule } from 'src/data-providers/data-providers.module';
import { JwtStrategy } from './jwt.strategy';


@Module({
  providers: [AuthService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: 'calendarBE@2025!'
    }),
    UsersModule,
    DataProvidersModule
  ],
  controllers: [AuthController]
})
export class AuthModule {}
