import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'formatDeviceLabel'})
export class FormatDeviceLabelPipe implements PipeTransform {
  transform(value: string, fallback: string = '') {
    return value.split('(').shift() || fallback
  }
}
