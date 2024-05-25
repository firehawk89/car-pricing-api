import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersService } from './users.service'
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async register(data: Prisma.UserCreateInput): Promise<User> {
    const { email, password } = data

    const userExists = await this.usersService.findOneByEmail(email)
    if (!!userExists) {
      throw new BadRequestException(`User with email ${email} already exists`)
    }

    const salt = randomBytes(16)
    const key = (await scrypt(password, salt, 32)) as Buffer

    const result = salt.toString('hex') + '.' + key.toString('hex')

    return this.prisma.user.create({ data: { email, password: result } })
  }

  //   async authenticate(data: Partial<User>): Promise<User> {}
}
