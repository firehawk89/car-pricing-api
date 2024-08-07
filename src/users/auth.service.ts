import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { UsersService } from './users.service'
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'
import { KEY_LENGTH, SALT_LENGTH } from 'src/utils/constants'
import { AuthenticateUserDTO } from './dto/authenticate-user.dto'

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(data: Prisma.UserCreateInput): Promise<User> {
    const { email, password } = data

    const user = await this.usersService.findOneByEmail(email)
    if (!!user) {
      throw new BadRequestException(`User with email ${email} already exists`)
    }

    const salt = randomBytes(SALT_LENGTH)
    const key = (await scrypt(password, salt, KEY_LENGTH)) as Buffer

    const result = salt.toString('hex') + '.' + key.toString('hex')

    return this.usersService.create({ email, password: result })
  }

  async authenticate(data: AuthenticateUserDTO): Promise<User> {
    const { email, password } = data

    const user = await this.usersService.findOneByEmail(email)
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`)
    }

    const [salt, storedKey] = user.password.split('.')
    const key = (await scrypt(
      password,
      Buffer.from(salt, 'hex'),
      KEY_LENGTH,
    )) as Buffer

    if (key.toString('hex') !== storedKey) {
      throw new BadRequestException('Invalid password')
    }

    return user
  }
}
