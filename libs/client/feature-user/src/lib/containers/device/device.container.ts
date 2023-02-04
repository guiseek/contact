import {Component, OnInit, inject} from '@angular/core'
import {AuthFacade} from '@contact/client/data-access-auth'
import {ShareService} from '@contact/client/shared/ui-layout'
import {UserFacade} from '@contact/client/data-access-user'

@Component({
  selector: 'user-device',
  templateUrl: './device.container.html',
  styleUrls: ['./device.container.scss'],
})
export class DeviceContainer implements OnInit {
  user = inject(UserFacade)
  auth = inject(AuthFacade)
  share = inject(ShareService)

  ngOnInit() {
    this.user.loadOneById(1)
  }

  onMenuClicked(action: string | number) {
    console.log(action)
  }
  open() {
    this.share.open({})
  }
}
