import * as request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from './../src/app.module'

const FAKE_EMAIL = 'e2e_testing_user@email.com'
const FAKE_PASSWORD = 'e2e_testing_user'

describe('Authentication System', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it('handles a signup request', async () => {
    const body = { email: FAKE_EMAIL, password: FAKE_PASSWORD }

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(body)
      .expect(201)
      .then((res) => {
        const { user_id, email } = res.body
        expect(user_id).toBeDefined()
        expect(email).toEqual(FAKE_EMAIL)
      })
  })
})
