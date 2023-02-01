import {Body, Controller, Get, Post, Sse} from '@nestjs/common'

import {AppService} from './app.service'
import {interval, map} from 'rxjs'
import {Allowed} from './utils'

interface Ping {
  userId: number
  ping: number
}
interface Pong extends Ping {
  pong: number
}
interface PingPong extends Pong {
  latency: number
}


class CheckUpMessage<T extends string | object> {
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
    return ping(1)
  }

  @Post('sse')
  pong(@Body() data: Pong) {
    const result = {...data, latency: data.pong - data.ping}
    console.log(result);

    return result
  }
}
