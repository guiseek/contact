import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {UiUserModule} from '@contact/client/shared/ui-user'
import {
  UiCdkModule,
  UiLayoutModule,
  UiMaterialModule,
} from '@contact/client/shared/ui-layout'
import {HomeContainer} from './containers/home/home.container'
import {featureHomeRoutes} from './lib.routes'

@NgModule({
  imports: [
    CommonModule,
    UiCdkModule,
    UiUserModule,
    UiLayoutModule,
    UiMaterialModule,
    RouterModule.forChild(featureHomeRoutes),
  ],
  declarations: [HomeContainer],
})
export class FeatureHomeModule {}
