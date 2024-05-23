import { Prisma } from '@prisma/client'
import { Expose } from 'class-transformer'

export class UserDTO {
  @Expose()
  [Prisma.UserScalarFieldEnum.user_id]: number;

  @Expose()
  [Prisma.UserScalarFieldEnum.email]: string
}
