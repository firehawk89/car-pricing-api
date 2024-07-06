import { Module } from '@nestjs/common'
import { ReportsController } from './reports.controller'
import { ReportsService } from './reports.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  controllers: [ReportsController],
  providers: [PrismaService, ReportsService],
})
export class ReportsModule {}
