import {Body, Controller, Get, Post, Sse, MessageEvent} from '@nestjs/common'

import {AppService} from './app.service'
import {interval, map} from 'rxjs'
import {Allowed} from './utils'
import {Ping, PingPong, Pong} from '@contact/shared/types'

class CheckUpMessage<T extends string | object> implements MessageEvent {
  retry = 10000
  constructor(public data: T) {}
}

export const ping = (seconds: number) => {
  const userId = 1
  return interval(1000 * seconds).pipe(
    map(() => new CheckUpMessage<Ping>({ping: Date.now(), userId}))
  )
}

@Controller()
export class AppController {
  map = new Map<number, PingPong>()

  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData()
  }

  @Allowed()
  @Sse('sse')
  sse() {
    return ping(2)
  }

  @Allowed()
  @Post('sse')
  pong(@Body() data: Pong) {
    const result = {...data, latency: data.pong - data.ping}
    this.map.set(data.userId, result)
    console.log(result)

    const eachSeconds = 10
    const reCheckAfterSeconds = eachSeconds * 2

    setTimeout(() => {
      const last = this.map.get(data.userId)
      if (last) {
        const timeExceeded = Date.now() - last.pong > 1000 * reCheckAfterSeconds

        if (timeExceeded) {
          console.log('salva o user como inativo')
        }
      }
    }, 1000 * eachSeconds)

    return result
  }
}
