import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {
  UiCdkModule,
  UiLayoutModule,
  UiMaterialModule,
} from '@contact/client/shared/ui-layout'
import {meetFeatureRoutes} from './lib.routes'

import {RoomContainer, AwaitContainer} from './containers'
import {VolumeterDirective} from './shared/directives'
import {MeetFeatureComponent} from './meet-feature.component'
import {AudioInputComponent} from './shared/components/audioinput.component'
import {VideoInputComponent} from './shared/components/videoinput.component'
import {DevicesComponent} from './shared/components/devices.component'
import {FormatDeviceLabelPipe} from './shared/pipes/format-device-label.pipe'
import {ResolutionsComponent} from './shared/components/resolutions.component'
import {SettingsService} from './settings/settings.service'
import {AudioConfigDialog} from './dialogs/audio-config/audio-config.dialog'
import {VideoConfigDialog} from './dialogs/video-config/video-config.dialog'
import {ConnectionStatePipe} from './pipes/connection-state.pipe'

@NgModule({
  imports: [
    CommonModule,
    UiCdkModule,
    UiLayoutModule,
    UiMaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(meetFeatureRoutes),
  ],
  declarations: [
    VolumeterDirective,
    DevicesComponent,
    MeetFeatureComponent,
    AudioInputComponent,
    VideoInputComponent,
    ResolutionsComponent,
    FormatDeviceLabelPipe,
    RoomContainer,
    AwaitContainer,
    AudioConfigDialog,
    VideoConfigDialog,
    ConnectionStatePipe,
  ],
  providers: [SettingsService],
})
export class MeetFeatureModule {}
