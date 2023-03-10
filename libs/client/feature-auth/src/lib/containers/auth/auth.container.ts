import {Component, OnDestroy, inject} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {AuthFacade} from '@contact/client/data-access-auth'
import {SubAsync} from '@contact/shared/data-access'
import {AuthRequest, CreateUser} from '@contact/shared/types'

interface AuthParams {
  action?: 'in' | 'up'
  redirectTo?: string
}

@Component({
  selector: 'auth-auth',
  templateUrl: './auth.container.html',
  styleUrls: ['./auth.container.scss'],
})
export class AuthContainer implements OnDestroy {
  sub = new SubAsync()

  router = inject(Router)
  route = inject(ActivatedRoute)

  auth = inject(AuthFacade)

  get queryParams() {
    return this.route.snapshot.queryParams as AuthParams
  }

  actions = ['in', 'up']
  get actionIndex() {
    const {action = 'in'} = this.queryParams
    const validAction = this.actions.includes(action)
    return validAction ? this.actions.indexOf(action) : 0
  }

  onSignIn<T extends AuthRequest>(value: T) {
    this.auth.signIn(value)

    this.sub.async = this.auth.isAuthenticated$.subscribe((state) => {
      if (state) this.redirect()
    })
  }

  onSignUp<T extends CreateUser>(value: T) {
    this.auth.signUp(value)

    this.sub.async = this.auth.isAuthenticated$.subscribe((state) => {
      if (state) this.redirect()
    })
  }

  onTabChange() {
    const form = document.querySelector('form')
    if (form) this.getInputOfForm(form).focus()
  }

  getInputOfForm(form: HTMLFormElement) {
    return form.querySelector(`[autofocus]`) as HTMLInputElement
  }

  redirect() {
    const {redirectTo = '/'} = this.queryParams
    this.router.navigateByUrl(redirectTo)
  }

  ngOnDestroy() {
    this.sub.unsub()
  }
}
