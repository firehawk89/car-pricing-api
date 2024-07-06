import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateReportDTO } from './dto/create-report.dto'
import { Report } from '@prisma/client'
import { UserDTO } from 'src/users/dto/user.dto'

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReportDTO, user: UserDTO): Promise<Report> {
    return this.prisma.report.create({
      data: { ...data, user_id: user.user_id },
    })
  }
}
