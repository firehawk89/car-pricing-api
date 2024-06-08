import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from './users.service'
import { Prisma } from '@prisma/client'

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(async () => {
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

    authService = module.get<AuthService>(AuthService)
  })

  it('can create an instance of auth service', async () => {
    expect(authService).toBeDefined()
  })
})
