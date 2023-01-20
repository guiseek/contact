import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {
  UiCdkModule,
  UiLayoutModule,
  UiMaterialModule,
} from '@contact/shared/ui-layout'
import {meetFeatureRoutes} from './lib.routes'

import {VolumeterDirective} from './shared/directives'
import {MeetFeatureComponent} from './meet-feature.component'
import {AudioInputComponent} from './shared/components/audioinput.component'
import {VideoInputComponent} from './shared/components/videoinput.component'
import {DevicesComponent} from './shared/components/devices.component'
import {FormatDeviceLabelPipe} from './shared/pipes/format-device-label.pipe'
import {ResolutionsComponent} from './shared/components/resolutions.component'
import {SettingsService} from './settings/settings.service'

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
  ],
  providers: [SettingsService],
})
export class MeetFeatureModule {}
