import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDTO {
  @ApiProperty()
  @IsEmail()
  [Prisma.UserScalarFieldEnum.email]: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  [Prisma.UserScalarFieldEnum.password]: string
}
