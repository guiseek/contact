import {Component, OnInit, inject} from '@angular/core'
import {AuthFacade} from '@contact/auth/data-access'
import {ShareService} from '@contact/shared/ui-layout'
import {UserFacade} from '@contact/user/data-access'

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
    this.user.loadOneById(1);
  }

  onMenuClicked(action: string | number) {
    console.log(action)
  }
  open() {
    this.share.open({})
  }
}
