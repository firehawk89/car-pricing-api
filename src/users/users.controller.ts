import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'

@ApiTags('auth')
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiQuery({ name: 'email', required: false })
  @Get()
  getUserByEmail(@Query('email') email: string) {
    return this.usersService.findOneByEmail(email)
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findOneById(parseInt(id, 10))
  }

  @Post('signup')
  createUser(@Body() body: CreateUserDTO) {
    return this.usersService.create(body)
  }
}
