import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatDialogModule} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatExpansionModule} from '@angular/material/expansion'
import {LayoutModule} from '@angular/cdk/layout'
import {RingDialog, MeetDialog, MeetService, RingService} from './dialogs'

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  declarations: [RingDialog, MeetDialog],
  exports: [RingDialog, MeetDialog],
  providers: [RingService, MeetService],
})
export class UiMeetModule {}
