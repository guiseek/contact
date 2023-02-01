import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core'
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs'
import {SubAsync} from '@contact/shared/data-access'
import {FormControl} from '@angular/forms'
import {UserResponse} from '@contact/shared/types'
import {UserFacade} from '@contact/user/data-access'

@Component({
  selector: 'user-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit, OnDestroy {
  private _sub = new SubAsync()

  control = new FormControl()

  user = inject(UserFacade)

  @Input() users?: Observable<UserResponse[] | null>

  private _loader = new BehaviorSubject(false)
  loader$ = this._loader.asObservable()

  @Output() searchUser = new EventEmitter<UserResponse>()

  ngOnInit() {
    this._sub.async = this.control.valueChanges
      .pipe(
        tap(() => this._loader.next(true)),
        debounceTime(600),
        distinctUntilChanged(),
        tap(() => this._loader.next(false))
      )
      .subscribe((query) => {
        if (typeof query === 'string') {
          this.user.searchUser({query})
        } else {
          this.searchUser.emit(query)
        }
      })
  }

  displayFn(user: UserResponse): string {
    return user && user.displayName ? user.displayName : ''
  }

  ngOnDestroy() {
    this._sub.unsub()
  }
}
