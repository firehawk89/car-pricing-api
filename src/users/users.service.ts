import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  async findOneById(id: string): Promise<User | null> {
    const parsedId = parseInt(id, 10)
    return this.prisma.user.findUnique({
      where: { user_id: parsedId },
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
    id: string,
    data: Partial<Prisma.UserUpdateInput>,
  ): Promise<User> {
    const user = await this.findOneById(id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    const parsedId = parseInt(id, 10)
    return this.prisma.user.update({
      where: { user_id: parsedId },
      data,
    })
  }

  async delete(id: string): Promise<User> {
    const user = await this.findOneById(id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    const parsedId = parseInt(id, 10)
    return this.prisma.user.delete({
      where: { user_id: parsedId },
    })
  }
}
