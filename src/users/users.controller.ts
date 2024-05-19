import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'

@ApiTags('auth')
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDTO) {
    return this.usersService.create(body)
  }
}
