import { rm } from 'fs/promises'
import { exec } from 'child_process'
import { join } from 'path'
import { promisify } from 'util'

const execPromise = promisify(exec)
const dbPath = join(__dirname, '../prisma/test.db')

global.beforeEach(async () => {
  try {
    await rm(dbPath, { force: true })
  } catch (error) {
    console.error(
      'Failed to clear the test.db file or file does not exist',
      error,
    )
  }

  try {
    await execPromise('dotenv -e .env.test.local -- npx prisma migrate deploy')
  } catch (error) {
    console.error('Failed to apply migrations', error)
  }
})
