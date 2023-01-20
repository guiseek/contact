import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {
  CheckUserDirective,
  SignInComponent,
  SignUpComponent,
} from './components'
import {AuthContainer} from './containers'
import {authFeatureRoutes} from './lib.routes'
import {UiMaterialModule} from '@contact/shared/ui-layout'

@NgModule({
  imports: [
    CommonModule,
    UiMaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(authFeatureRoutes),
  ],
  declarations: [
    AuthContainer,
    SignUpComponent,
    SignInComponent,
    CheckUserDirective,
  ],
})
export class AuthFeatureModule {}
