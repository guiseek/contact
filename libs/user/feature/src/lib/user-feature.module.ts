import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { userFeatureRoutes } from './lib.routes';
import { DeviceContainer } from './containers/device/device.container';
import { UiLayoutModule, UiMaterialModule } from '@contact/shared/ui-layout';

@NgModule({
  imports: [
    CommonModule,
    UiLayoutModule,
    UiMaterialModule,
    RouterModule.forChild(userFeatureRoutes),
  ],
  declarations: [DeviceContainer],
})
export class UserFeatureModule {}
