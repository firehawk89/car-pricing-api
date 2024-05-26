import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthService } from './auth.service'
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    { useClass: CurrentUserInterceptor, provide: APP_INTERCEPTOR },
  ],
})
export class UsersModule {}
