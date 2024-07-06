import { Prisma } from '@prisma/client'
import { Expose } from 'class-transformer'

export class ReportDTO {
  @Expose()
  [Prisma.ReportScalarFieldEnum.user_id]: number;

  @Expose()
  [Prisma.ReportScalarFieldEnum.price]: number;

  @Expose()
  [Prisma.ReportScalarFieldEnum.manufacturer]: string;

  @Expose()
  [Prisma.ReportScalarFieldEnum.model]: string;

  @Expose()
  [Prisma.ReportScalarFieldEnum.year]: number;

  @Expose()
  [Prisma.ReportScalarFieldEnum.longitude]: number;

  @Expose()
  [Prisma.ReportScalarFieldEnum.latitude]: number;

  @Expose()
  [Prisma.ReportScalarFieldEnum.mileage]: number
}
