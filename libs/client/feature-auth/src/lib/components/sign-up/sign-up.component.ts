import {Component, EventEmitter, Output} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {CreateUser} from '@contact/shared/types'
import {SignComponent, SignForm} from '../sign.component'

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign.component.scss'],
})
export class SignUpComponent extends SignComponent<CreateUser> {
  @Output() sign = new EventEmitter<CreateUser>()

  form = new FormGroup<SignForm<CreateUser>>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    displayName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(500)],
    }),
  })
}
