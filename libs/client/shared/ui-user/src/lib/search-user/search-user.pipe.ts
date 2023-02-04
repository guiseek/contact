import {Pipe, PipeTransform} from '@angular/core'
import {UserResponse} from '@contact/shared/types'
import {Observable, map} from 'rxjs'

@Pipe({name: 'searchUser'})
export class SearchUserPipe implements PipeTransform {
  transform(users: Observable<UserResponse[]>, id: number) {
    return users.pipe(map((users) => users.filter((user) => user.id !== id)))
  }
}
