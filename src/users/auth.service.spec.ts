import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from './users.service'
import { Prisma } from '@prisma/client'

it('can create an instance of auth service', async () => {
  const fakeUsersService: Partial<UsersService> = {
    findOneByEmail: () => Promise.resolve(null),
    create: ({ email, password }: Prisma.UserCreateInput) =>
      Promise.resolve({
        user_id: 1,
        email,
        password,
      }),
  }

  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      { provide: UsersService, useValue: fakeUsersService },
    ],
  }).compile()

  const authService = module.get(AuthService)

  expect(authService).toBeDefined()
})
