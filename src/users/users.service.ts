import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { user_id: id },
    })
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const { email, password } = data
    return this.prisma.user.create({ data: { email, password } })
  }

  async update(
    id: number,
    data: Partial<Prisma.UserUpdateInput>,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { user_id: id },
      data,
    })
  }
}
