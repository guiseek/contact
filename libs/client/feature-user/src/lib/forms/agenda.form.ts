import {FormControl, FormGroup, Validators} from '@angular/forms'
import {
  eachMinuteOfInterval,
  endOfDay,
  isToday,
  addHours,
  addMinutes,
} from 'date-fns'
import {SubAsync} from '@contact/shared/data-access'
import {BehaviorSubject} from 'rxjs'

const initialValue = {
  title: '',
  visible: true,
  start: null,
  end: null,
}

export class AgendaForm extends FormGroup {
  private _sub = new SubAsync()

  private _step = 15

  private _startList = new BehaviorSubject<Date[]>([])
  private _endList = new BehaviorSubject<Date[]>([])

  startList$ = this._startList.asObservable()
  endList$ = this._endList.asObservable()

  minStart = new Date()
  date = new FormControl()

  constructor() {
    super({
      title: new FormControl(initialValue.title, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      start: new FormControl<Date | null>(initialValue.start, [
        Validators.required,
      ]),
      end: new FormControl<Date | null>(initialValue.end),
      visible: new FormControl(initialValue.visible),
    })
  }

  private get _start() {
    return this.get('start') as FormControl<Date>
  }

  initHandler() {
    const dateChanges = this.date.valueChanges
    this._sub.async = dateChanges.subscribe((value) => {
      if (value) this.onDateChange(value)
    })

    const startChanges = this._start.valueChanges
    this._sub.async = startChanges.subscribe((value) => {
      if (value) this._onStartChange(new Date(value))
    })

    this.date.setValue(new Date())
  }

  cancelHandler() {
    this._sub.unsub()
  }

  clear() {
    // this.get('start')?.setValue(initialValue.start)
    // this.get('title')?.setValue(initialValue.title)
  }

  onDateChange(date: Date) {
    let start = date

    if (isToday(date)) {
      start = this._adjustStart(date)
    }

    const range = {start, end: endOfDay(start)}
    const startList = eachMinuteOfInterval(range, {step: this._step})

    this._startList.next(startList)
    this._start.setValue(start)
  }

  private _adjustStart(date: Date) {
    let start = date

    const now = new Date()
    const minutes = now.getMinutes()

    if (minutes <= this._step) {
      start.setHours(now.getHours())
      start = addMinutes(now, this._step - minutes)
    } else {
      start = addHours(now, 1)
      start.setMinutes(0)
    }

    return start
  }

  private _onStartChange(value: Date) {
    const start = addMinutes(value, this._step)
    const end = endOfDay(start)
    this._endList.next(eachMinuteOfInterval({start, end}, {step: this._step}))
  }
}
