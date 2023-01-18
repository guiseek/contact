import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AudioComponent } from './audio/audio.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {
        path: 'audio',
        component: AudioComponent,
        outlet: 'setting',
      },
      {
        path: 'video',
        component: VideoComponent,
        outlet: 'settings',
      },
      {
        path: '',
        outlet: 'settings',
        redirectTo: 'audio',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
