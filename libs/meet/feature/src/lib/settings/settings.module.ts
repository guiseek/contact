import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatDialogModule} from '@angular/material/dialog'
import {MatListModule} from '@angular/material/list'
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatTabsModule} from '@angular/material/tabs'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSelectModule} from '@angular/material/select'
import {MatIconModule} from '@angular/material/icon'
import {SettingsComponent} from './settings.component'
import {SettingsService} from './settings.service'
import {AudioComponent} from './audio/audio.component'
import {VideoComponent} from './video/video.component'
import {SettingsRoutingModule} from './settings-routing.module'

@NgModule({
  declarations: [SettingsComponent, AudioComponent, VideoComponent],
  imports: [CommonModule, MatDialogModule, MatListModule, MatButtonModule, MatInputModule, MatTabsModule, MatFormFieldModule, MatSelectModule, MatIconModule, SettingsRoutingModule],
  providers: [SettingsService],
})
export class SettingsModule {}
