import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateReportDTO } from './dto/create-report.dto'
import { Report } from '@prisma/client'
import { UserDTO } from 'src/users/dto/user.dto'

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async findOneById(id: string): Promise<Report> {
    const parsedId = parseInt(id, 10)
    return this.prisma.report.findUnique({
      where: { report_id: parsedId },
    })
  }

  async create(data: CreateReportDTO, user: UserDTO): Promise<Report> {
    return this.prisma.report.create({
      data: { ...data, user_id: user.user_id },
    })
  }

  async updateApproval(id: string, approved: boolean): Promise<Report> {
    const parsedId = parseInt(id, 10)
    return this.prisma.report.update({
      where: { report_id: parsedId },
      data: { approved },
    })
  }
}
