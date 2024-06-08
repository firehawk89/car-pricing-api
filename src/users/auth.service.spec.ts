import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from './users.service'
import { Prisma } from '@prisma/client'
import { BadRequestException } from '@nestjs/common'

describe('AuthService', () => {
  let authService: AuthService
  let fakeUsersService: Partial<UsersService>

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
    const email = 'testing_user@email.com'
    const password = 'testing_user'

    fakeUsersService.findOneByEmail = () =>
      Promise.resolve({
        user_id: 1,
        email,
        password,
      })

    await expect(
      authService.register({
        email,
        password,
      }),
    ).rejects.toThrow(BadRequestException)
  })

  it('creates a new user with a salted and hashed password', async () => {
    const plainPassword = 'testing_user'

    const user = await authService.register({
      email: 'testing_user@email.com',
      password: plainPassword,
    })

    const [salt, hash] = user.password.split('.')

    expect(user.password).not.toEqual(plainPassword)
    expect(salt).toBeDefined()
    expect(hash).toBeDefined()
  })
})
