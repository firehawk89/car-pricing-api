import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  findOneById(id: string): Promise<User | null> {
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

  async create(data: CreateUserDTO): Promise<User> {
    const { email, password } = data
    return this.prisma.user.create({ data: { email, password } })
  }

  async update(id: string, data: Partial<UpdateUserDTO>): Promise<User> {
    const parsedId = parseInt(id, 10)
    return this.prisma.user.update({
      where: { user_id: parsedId },
      data,
    })
  }

  async delete(id: string): Promise<User> {
    const parsedId = parseInt(id, 10)
    return this.prisma.user.delete({
      where: { user_id: parsedId },
    })
  }
}
