import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class UsersController {
  @Post('signup')
  createUser(@Body() body: CreateUserDTO) {
    console.log(body)
  }
}
