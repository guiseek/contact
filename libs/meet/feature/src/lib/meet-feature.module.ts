import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { meetFeatureRoutes } from './lib.routes';

import { VolumeterDirective } from './shared/directives';
import { MeetFeatureComponent } from './meet-feature.component';
import { AudioInputComponent } from './shared/components/audioinput.component';
import { VideoInputComponent } from './shared/components/videoinput.component';
import { DevicesComponent } from './shared/components/devices.component';
import { FormatDeviceLabelPipe } from './shared/pipes/format-device-label.pipe';
import { ResolutionsComponent } from './shared/components/resolutions.component';
import { SettingsService } from './settings/settings.service';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
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
  providers: [SettingsService]
})
export class MeetFeatureModule {}
