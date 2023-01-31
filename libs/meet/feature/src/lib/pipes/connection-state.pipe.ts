import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'connectionState'
})
export class ConnectionStatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
