import { MiddlewareConsumer, Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthService } from './auth.service'
import { CurrentUserMiddleware } from 'src/middlewares/current-user.middleware'

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
