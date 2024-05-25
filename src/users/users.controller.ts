import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { UpdateUserDTO } from './dto/update-user.dto'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { UserDTO } from './dto/user.dto'
import { AuthService } from './auth.service'
import { AuthenticateUserDTO } from './dto/authenticate-user.dto'

@ApiTags('auth')
@Controller('auth')
@Serialize(UserDTO)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiQuery({ name: 'email', required: false })
  @Get()
  getUsers(@Query('email') email: string) {
    if (email) {
      return this.usersService.findOneByEmail(email)
    }

    return this.usersService.findAll()
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    return user
  }

  @Post('signup')
  createUser(@Body() body: CreateUserDTO) {
    return this.authService.register(body)
  }

  @Post('signin')
  authenticateUser(@Body() body: AuthenticateUserDTO) {
    return this.authService.authenticate(body)
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    const user = await this.usersService.findOneById(id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    return this.usersService.update(id, body)
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    return this.usersService.delete(id)
  }
}
