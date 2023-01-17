import { Component, OnInit, inject } from '@angular/core';
import { UserFacade } from '@contact/user/data-access';

@Component({
  selector: 'user-device',
  templateUrl: './device.container.html',
  styleUrls: ['./device.container.scss'],
})
export class DeviceContainer implements OnInit {
  facade = inject(UserFacade);

  ngOnInit() {
    this.facade.loadOneById(1);
  }
}
