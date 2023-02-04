import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {UiLayoutModule} from '@contact/client/shared/ui-layout'
import {SearchUserComponent} from './search-user/search-user.component'
import {SearchUserPipe} from './search-user/search-user.pipe'

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    UiLayoutModule,
  ],
  declarations: [SearchUserComponent, SearchUserPipe],
  exports: [SearchUserComponent, SearchUserPipe],
})
export class UiUserModule {}
