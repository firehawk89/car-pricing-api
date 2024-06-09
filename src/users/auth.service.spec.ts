import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from './users.service'
import { Prisma, User } from '@prisma/client'
import { BadRequestException, NotFoundException } from '@nestjs/common'

describe('AuthService', () => {
  let authService: AuthService
  let fakeUsersService: Partial<UsersService>

  const fakeEmail = 'testing_user@email.com'
  const fakePassword = 'testing_user'

  beforeEach(async () => {
    const users: User[] = []

    fakeUsersService = {
      findOneByEmail: (email: string) => {
        const user = users.find((user) => user.email === email)
        return Promise.resolve(user)
      },
      create: ({ email, password }: Prisma.UserCreateInput) => {
        const id = Math.floor(Math.random() * 1000)
        const user: User = { user_id: id, email, password }
        users.push(user)
        return Promise.resolve(user)
      },
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
    await authService.register({
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

  it('throws an error if user tries to sign in with a wrong password', async () => {
    const wrongPassword = 'wrong_password'

    await authService.register({
      email: fakeEmail,
      password: fakePassword,
    })

    await expect(
      authService.authenticate({
        email: fakeEmail,
        password: wrongPassword,
      }),
    ).rejects.toThrow(BadRequestException)
  })

  it('returns a user if password is correct', async () => {
    await authService.register({ email: fakeEmail, password: fakePassword })

    const user = await authService.authenticate({
      email: fakeEmail,
      password: fakePassword,
    })

    expect(user).toBeDefined()
  })
})
