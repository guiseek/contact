import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { userFeatureRoutes } from './lib.routes';
import { DeviceContainer } from './containers/device/device.container';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(userFeatureRoutes)],
  declarations: [DeviceContainer],
})
export class UserFeatureModule {}
