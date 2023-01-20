import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {UiLayoutModule, UiMaterialModule} from '@contact/shared/ui-layout'
import {DeviceContainer, AccountContainer, AgendaContainer} from './containers'
import {UserFeatureShell} from './user-feature.shell'
import {userFeatureRoutes} from './lib.routes'
import {IsPastPipe} from './pipes/is-past.pipe'
import {CreateMeetingComponent} from './components/create-meeting/create-meeting.component'
import {AgendaItemComponent} from './components/agenda-item/agenda-item.component'
import {CreateMeetingDialog} from './dialogs/create-meeting/create-meeting.dialog'
import {SearchUserComponent} from './components/search-user/search-user.component'
import {SearchUserDialog} from './dialogs/search-user/search-user.dialog'

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UiLayoutModule, UiMaterialModule, RouterModule.forChild(userFeatureRoutes)],
  declarations: [UserFeatureShell, DeviceContainer, AccountContainer, AgendaContainer, IsPastPipe, CreateMeetingComponent, AgendaItemComponent, CreateMeetingDialog, SearchUserComponent, SearchUserDialog],
})
export class UserFeatureModule {}
