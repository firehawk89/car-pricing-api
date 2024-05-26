import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    const { currentUser } = request
    return currentUser
  },
)
