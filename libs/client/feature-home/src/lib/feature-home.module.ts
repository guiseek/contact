import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {featureHomeRoutes} from './lib.routes'
import {HomeContainer} from './containers/home/home.container'
import {UiCdkModule, UiLayoutModule, UiMaterialModule} from '@contact/shared/ui-layout'

@NgModule({
  imports: [
    CommonModule,
    UiCdkModule,
    UiLayoutModule,
    UiMaterialModule,
    RouterModule.forChild(featureHomeRoutes),
  ],
  declarations: [HomeContainer],
})
export class FeatureHomeModule {}
