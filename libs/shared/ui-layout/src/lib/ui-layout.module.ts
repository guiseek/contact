import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from '@angular/material/dialog';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MediaQueryDirective } from './layout/media-query.directive';
import { ShareDialog } from './dialogs';
import { ShareService } from './dialogs/share/share.service';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
  ],
  declarations: [ToolbarComponent, MediaQueryDirective, ShareDialog],
  exports: [ToolbarComponent, MediaQueryDirective, ShareDialog],
  providers: [ShareService]
})
export class UiLayoutModule {}
