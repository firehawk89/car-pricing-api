import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateReportDTO } from './dto/create-report.dto'
import { ReportsService } from './reports.service'
import { AuthGuard } from 'src/guards/auth.guard'
import { CurrentUser } from 'src/users/decorators/current-user.decorator'
import { UserDTO } from 'src/users/dto/user.dto'
import { ApproveReportDTO } from './dto/approve-report.dto'
import { AdminGuard } from 'src/guards/admin.guard'

@ApiTags('reports')
@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  async createReport(
    @Body() body: CreateReportDTO,
    @CurrentUser() user: UserDTO,
  ) {
    return this.reportsService.create(body, user)
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async approveReport(@Param('id') id: string, @Body() body: ApproveReportDTO) {
    const report = await this.reportsService.findOneById(id)
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`)
    }

    const { approved } = body
    return this.reportsService.updateApproval(id, approved)
  }
}
