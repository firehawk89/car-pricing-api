import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from './users.service'
import { Prisma } from '@prisma/client'
import { BadRequestException, NotFoundException } from '@nestjs/common'

describe('AuthService', () => {
  let authService: AuthService
  let fakeUsersService: Partial<UsersService>

  const fakeEmail = 'testing_user@email.com'
  const fakePassword = 'testing_user'

  beforeEach(async () => {
    fakeUsersService = {
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

  it('throws an error if user tries to register with an email that is in use', async () => {
    fakeUsersService.findOneByEmail = () =>
      Promise.resolve({
        user_id: 1,
        email: fakeEmail,
        password: fakePassword,
      })

    await expect(
      authService.register({
        email: fakeEmail,
        password: fakePassword,
      }),
    ).rejects.toThrow(BadRequestException)
  })

  it('creates a new user with a salted and hashed password', async () => {
    const user = await authService.register({
      email: fakeEmail,
      password: fakePassword,
    })

    const [salt, hash] = user.password.split('.')

    expect(user.password).not.toEqual(fakePassword)
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })

  it('throws an error if user tries to sign in with an email which not exists', async () => {
    await expect(
      authService.authenticate({
        email: fakeEmail,
        password: fakePassword,
      }),
    ).rejects.toThrow(NotFoundException)
  })
})
