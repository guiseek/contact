import {NgModule} from '@angular/core'
import {MatMenuModule} from '@angular/material/menu'
import {LayoutModule} from '@angular/cdk/layout'
import {MatIconModule} from '@angular/material/icon'
import {MatCardModule} from '@angular/material/card'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatListModule} from '@angular/material/list'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatDialogModule} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button'
import {MatSelectModule} from '@angular/material/select'
import {MatDividerModule} from '@angular/material/divider'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatTabsModule} from '@angular/material/tabs'
import {MatNativeDateModule} from '@angular/material/core'

@NgModule({
  exports: [
    LayoutModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class UiMaterialModule {}
