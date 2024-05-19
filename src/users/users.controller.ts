import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { UpdateUserDTO } from './dto/update-user.dto'

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
    const parsedId = parseInt(id, 10)
    return this.usersService.findOneById(parsedId)
  }

  @Post('signup')
  createUser(@Body() body: CreateUserDTO) {
    return this.usersService.create(body)
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    const parsedId = parseInt(id, 10)
    return this.usersService.update(parsedId, body)
  }
}
