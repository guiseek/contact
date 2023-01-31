import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatListModule} from '@angular/material/list'
import {MatDividerModule} from '@angular/material/divider'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatMenuModule} from '@angular/material/menu'
import {LayoutModule} from '@angular/cdk/layout'
import {MatDialogModule} from '@angular/material/dialog'
import {ToolbarComponent} from './toolbar/toolbar.component'
import {MediaQueryDirective} from './layout/media-query.directive'
import {ShareDialog} from './dialogs'
import {ShareService} from './dialogs/share/share.service'
import {ToolbarDropdownComponent} from './toolbar/toolbar-dropdown.component'
import {FabMenuComponent} from './fab-menu/fab-menu.component'
import {SvgLoaderComponent} from './svg-loader/svg-loader.component'
import {NavDrawerComponent} from './nav-drawer/nav-drawer.component'
import {ProgressBarComponent} from './progress-bar/progress-bar.component'

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    LayoutModule,
  ],
  declarations: [
    ToolbarComponent,
    FabMenuComponent,
    MediaQueryDirective,
    SvgLoaderComponent,
    ShareDialog,
    ToolbarDropdownComponent,
    NavDrawerComponent,
    ProgressBarComponent,
  ],
  exports: [
    ToolbarComponent,
    FabMenuComponent,
    MediaQueryDirective,
    SvgLoaderComponent,
    ShareDialog,
    ToolbarDropdownComponent,
    NavDrawerComponent,
    ProgressBarComponent,
  ],
  providers: [ShareService],
})
export class UiLayoutModule {}
