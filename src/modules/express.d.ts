import { User } from '@prisma/client'

declare module 'express' {
  export interface Request {
    currentUser?: User
  }
}

declare module 'express-session' {
  export interface SessionData {
    userId: string
  }
}
