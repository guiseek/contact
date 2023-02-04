import {
  Input,
  OnInit,
  Output,
  inject,
  Component,
  OnDestroy,
  EventEmitter,
} from '@angular/core'
import {
  tap,
  Observable,
  debounceTime,
  BehaviorSubject,
  distinctUntilChanged,
} from 'rxjs'
import {FormControl} from '@angular/forms'
import {UserResponse} from '@contact/shared/types'
import {SubAsync} from '@contact/shared/data-access'
import {UserFacade} from '@contact/client/data-access-user'

@Component({
  selector: 'contact-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit, OnDestroy {
  private _sub = new SubAsync()

  control = new FormControl()

  user = inject(UserFacade)

  @Input() me = 0
  @Input() label = 'Buscar'

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
