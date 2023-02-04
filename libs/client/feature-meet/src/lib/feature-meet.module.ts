import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {featureMeetRoutes} from './lib.routes'
import {
  UiCdkModule,
  UiLayoutModule,
  UiMaterialModule,
} from '@contact/client/shared/ui-layout'
import {FeatureMeetShell} from './feature-meet.shell'
import {
  AudioContainer,
  VideoContainer,
  RoomContainer,
  SpeakerContainer,
} from './containers'
import {DeviceListComponent} from './components'
import {SettingsContainer} from './containers/settings/settings.container'

@NgModule({
  imports: [
    UiCdkModule,
    CommonModule,
    UiLayoutModule,
    UiMaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(featureMeetRoutes),
  ],
  declarations: [
    AudioContainer,
    VideoContainer,
    RoomContainer,
    SpeakerContainer,
    DeviceListComponent,
    FeatureMeetShell,
    SettingsContainer,
  ],
})
export class FeatureMeetModule {}
