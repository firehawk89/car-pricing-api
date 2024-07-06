import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator'
import {
  MAX_MILEAGE,
  MAX_PRICE,
  MAX_YEAR,
  MIN_MILEAGE,
  MIN_PRICE,
  MIN_YEAR,
} from 'src/utils/constants'

export class CreateReportDTO {
  @ApiProperty()
  @IsNumber()
  @Min(MIN_PRICE)
  @Max(MAX_PRICE)
  @IsNotEmpty()
  [Prisma.ReportScalarFieldEnum.price]: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  [Prisma.ReportScalarFieldEnum.manufacturer]: string;

  @ApiPropertyOptional()
  @IsString()
  [Prisma.ReportScalarFieldEnum.model]: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(MIN_YEAR)
  @Max(MAX_YEAR)
  [Prisma.ReportScalarFieldEnum.year]: number;

  @ApiProperty()
  @IsLongitude()
  @IsNotEmpty()
  [Prisma.ReportScalarFieldEnum.longitude]: number;

  @ApiProperty()
  @IsLatitude()
  @IsNotEmpty()
  [Prisma.ReportScalarFieldEnum.latitude]: number;

  @ApiProperty()
  @IsNumber()
  @Min(MIN_MILEAGE)
  @Max(MAX_MILEAGE)
  @IsNotEmpty()
  [Prisma.ReportScalarFieldEnum.mileage]: number
}
