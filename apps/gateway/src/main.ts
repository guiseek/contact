/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common'
import {NestFactory, Reflector} from '@nestjs/core'

import {AppModule} from './app/app.module'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    forceCloseConnections: true,
    cors: {
      origin: '*',
    },
  })
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  const config = new DocumentBuilder()
    .setTitle('Gateway')
    .setDescription('The Speek Keep API')
    .setVersion('1.0')
    .addTag('contact')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  )

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const port = process.env.PORT || 3333
  await app.listen(port)
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  )
}

bootstrap()
