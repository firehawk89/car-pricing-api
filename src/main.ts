import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const swagerConfig = new DocumentBuilder()
    .setTitle('Car Pricing API')
    .setDescription('Simple API to get car pricing information')
    .setVersion('0.1')
    .build()
  const document = SwaggerModule.createDocument(app, swagerConfig)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}

bootstrap()
