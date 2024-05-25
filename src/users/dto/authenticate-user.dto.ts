import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { Prisma } from '@prisma/client'

export class AuthenticateUserDTO {
  @ApiProperty()
  @IsEmail()
  [Prisma.UserScalarFieldEnum.email]: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  [Prisma.UserScalarFieldEnum.password]: string
}
