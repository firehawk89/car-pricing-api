import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { Prisma, User } from '@prisma/client'
import { AuthService } from './auth.service'
import { NotFoundException } from '@nestjs/common'

const FAKE_EMAIL = 'testing_user@email.com'
const FAKE_PASSWORD = 'testing_user'

describe('UsersController', () => {
  let users: User[] = [
    { user_id: 1, email: `1_${FAKE_EMAIL}`, password: FAKE_PASSWORD },
    { user_id: 2, email: `2_${FAKE_EMAIL}`, password: FAKE_PASSWORD },
    { user_id: 3, email: `3_${FAKE_EMAIL}`, password: FAKE_PASSWORD },
  ]

  let usersController: UsersController
  let fakeUsersService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {
    fakeUsersService = {
      findAll: () => {
        return Promise.resolve(users)
      },
      findOneById: (id: string) => {
        const parsedId = parseInt(id, 10)
        const user = users.find((user) => user.user_id === parsedId)
        return Promise.resolve(user)
      },
      findOneByEmail: (email: string) => {
        const user = users.find((user) => user.email === email)
        return Promise.resolve(user)
      },
      update: (id: string, data: Partial<Prisma.UserUpdateInput>) => {
        const parsedId = parseInt(id, 10)
        let user = users.find((user) => user.user_id === parsedId)
        user = {
          ...user,
          email: data.email as string,
          password: data.password as string,
        }
        return Promise.resolve(user)
      },
      delete: (id: string) => {
        const parsedId = parseInt(id, 10)
        const user = users.find((user) => user.user_id === parsedId)
        users = users.filter((user) => user.user_id !== parsedId)
        return Promise.resolve(user)
      },
    }

    fakeAuthService = {
      register: () => null,
      authenticate: () => null,
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile()

    usersController = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(usersController).toBeDefined()
  })

  it('should return all users', async () => {
    const foundUsers = await usersController.getUsers()
    expect(foundUsers).toEqual(users)
  })

  it('should return a user by email', async () => {
    const email = `1_${FAKE_EMAIL}`
    const user = (await usersController.getUsers(email)) as User
    expect(user.email).toEqual(email)
  })

  it('throws an error if user is not found by ID', async () => {
    const id = (users[users.length - 1].user_id + 1).toString()
    await expect(usersController.getUser(id)).rejects.toThrow(NotFoundException)
  })

  it('should return a user by ID', async () => {
    const id = users[0].user_id.toString()
    const user = await usersController.getUser(id)
    expect(user).toBeDefined()
  })
})
