import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatDividerModule} from '@angular/material/divider'
import {MatMenuModule} from '@angular/material/menu'
import {LayoutModule} from '@angular/cdk/layout'
import {MatDialogModule} from '@angular/material/dialog'
import {ToolbarComponent} from './toolbar/toolbar.component'
import {MediaQueryDirective} from './layout/media-query.directive'
import {ShareDialog} from './dialogs'
import {ShareService} from './dialogs/share/share.service'
import {ToolbarDropdownComponent} from './toolbar/toolbar-dropdown.component'

@NgModule({
  imports: [RouterModule, CommonModule, MatToolbarModule, MatMenuModule, MatDialogModule, MatButtonModule, MatDividerModule, MatIconModule, LayoutModule],
  declarations: [ToolbarComponent, MediaQueryDirective, ShareDialog, ToolbarDropdownComponent],
  exports: [ToolbarComponent, MediaQueryDirective, ShareDialog, ToolbarDropdownComponent],
  providers: [ShareService],
})
export class UiLayoutModule {}
