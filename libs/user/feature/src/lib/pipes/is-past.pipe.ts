import {Pipe, PipeTransform} from '@angular/core'
import isPast from 'date-fns/isPast'

@Pipe({ name: 'isPast' })
export class IsPastPipe implements PipeTransform {
  transform = (value: Date) => isPast(value)
}
