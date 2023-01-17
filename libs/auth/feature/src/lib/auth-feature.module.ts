import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import {
  CheckUserDirective,
  SignInComponent,
  SignUpComponent,
} from './components';
import { AuthContainer } from './containers';
import { authFeatureRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule.forChild(authFeatureRoutes)
  ],
  declarations: [
    AuthContainer,
    SignUpComponent,
    SignInComponent,
    CheckUserDirective,
  ],
})
export class AuthFeatureModule {}
