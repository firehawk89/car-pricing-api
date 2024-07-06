import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsBoolean, IsNotEmpty } from 'class-validator'

export class ApproveReportDTO {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  [Prisma.ReportScalarFieldEnum.approved]: boolean
}
