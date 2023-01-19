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
  facade = inject(UserFacade)
  auth = inject(AuthFacade)
  share = inject(ShareService)

  ngOnInit() {
    console.log('')

    // this.facade.loadOneById(1);
    // this.auth.validate().subscribe(console.log)
  }

  open() {
    this.share.open({})
  }
}
