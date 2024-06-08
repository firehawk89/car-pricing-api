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
  Session,
  UseGuards,
} from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { UpdateUserDTO } from './dto/update-user.dto'
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { UserDTO } from './dto/user.dto'
import { AuthService } from './auth.service'
import { AuthenticateUserDTO } from './dto/authenticate-user.dto'
import { CurrentUser } from './decorators/current-user.decorator'
import { AuthGuard } from 'src/guards/auth.guard'

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

  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: UserDTO) {
    return user
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
  async createUser(
    @Body() body: CreateUserDTO,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.register(body)
    session.userId = user.user_id
    return user
  }

  @Post('signin')
  async authenticateUser(
    @Body() body: AuthenticateUserDTO,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.authenticate(body)
    session.userId = user.user_id
    return user
  }

  @Post('signout')
  async signOutUser(@Session() session: Record<string, any>) {
    session.userId = null
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
