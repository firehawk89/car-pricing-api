import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateReportDTO } from './dto/create-report.dto'
import { ReportsService } from './reports.service'
import { AuthGuard } from 'src/guards/auth.guard'
import { CurrentUser } from 'src/users/decorators/current-user.decorator'
import { UserDTO } from 'src/users/dto/user.dto'

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createReport(
    @Body() body: CreateReportDTO,
    @CurrentUser() user: UserDTO,
  ) {
    return this.reportsService.create(body, user)
  }
}
