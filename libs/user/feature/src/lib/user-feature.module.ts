import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {userFeatureRoutes} from './lib.routes'
import {DeviceContainer} from './containers/device/device.container'
import {UiLayoutModule, UiMaterialModule} from '@contact/shared/ui-layout'
import {AccountContainer} from './containers/account/account.container'
import {AgendaContainer} from './containers/agenda/agenda.container'

@NgModule({
  imports: [CommonModule, UiLayoutModule, UiMaterialModule, RouterModule.forChild(userFeatureRoutes)],
  declarations: [DeviceContainer, AccountContainer, AgendaContainer],
})
export class UserFeatureModule {}
