import {HttpService, Ping, PingPong, RingData} from '@contact/shared/types'
import {tap, switchMap, fromEvent, BehaviorSubject} from 'rxjs'
import {MatDialog} from '@angular/material/dialog'
import {Injectable} from '@angular/core'
import {RingDialog} from './ring.dialog'

@Injectable()
export class RingService {
  private _pingPong = new BehaviorSubject<Partial<PingPong>>({})
  readonly pingPong$ = this._pingPong.asObservable()
  private _lastPong?: PingPong

  constructor(private _http: HttpService, private _dialog: MatDialog) {}

  open() {
    return this._dialog.open<RingDialog>(RingDialog)
  }

  ring(data: RingData) {
    return this._dialog.open<RingDialog, RingData, boolean>(RingDialog, {
      data,
      disableClose: true,
      backdropClass: 'ring-backdrop',
      panelClass: 'ring-dialog',
      hasBackdrop: true,
    })
  }

  check(eachSeconds = 2) {
    // const reCheckAfterSeconds = eachSeconds * 2
    // const inactive$ = interval(1000 * eachSeconds).pipe(
    //   filter(() => {
    //     return this._lastPong
    //       ? Date.now() - this._lastPong.pong > (1000 * eachSeconds)
    //       : false
    //   })
    // )

    this.pingPong().subscribe((pingPong) => {
      console.log(pingPong)
    })

    // inactive$.subscribe(() => {
    //   console.log('retry');
    //   this.pingPong().subscribe((pingPong) => {
    //     console.log(pingPong)
    //   })
    // })
  }

  private pingPong() {
    return this.pong().pipe(
      tap((pingPong) => {
        this._pingPong.next(pingPong)
        this._lastPong = pingPong
      })
    )
  }

  private pong() {
    return this.ping().pipe(
      switchMap((ping) => {
        const pong = Object.assign(ping, {pong: Date.now()})
        return this._http.post<PingPong>('/api/sse', pong)
      })
    )
  }

  private ping(url = '/api/sse') {
    const eventSource = new EventSource(url)
    return fromEvent<MessageEvent<string>, Ping>(
      eventSource,
      'message',
      ({data}: MessageEvent<string>) => JSON.parse(data)
    )
  }
}
