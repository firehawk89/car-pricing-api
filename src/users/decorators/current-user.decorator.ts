import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    const { currentUser } = request

    if (!currentUser) {
      throw new UnauthorizedException('User not authenticated')
    }

    return request.currentUser
  },
)
