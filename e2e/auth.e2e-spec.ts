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

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(body)
      .expect(201)

    const { user_id, email } = response.body
    expect(user_id).toBeDefined()
    expect(email).toEqual(FAKE_EMAIL)
  })

  it('handles a whoami request after signup', async () => {
    const email = `2${FAKE_EMAIL}`
    const body = { email, password: FAKE_PASSWORD }

    const signupResponse = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(body)
      .expect(201)
    const cookie = signupResponse.get('Set-Cookie')

    const whoamiResponse = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200)

    expect(whoamiResponse.body.email).toEqual(email)
  })
})
