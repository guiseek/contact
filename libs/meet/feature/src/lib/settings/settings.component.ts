import {Component, inject} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'contact-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  route = inject(ActivatedRoute)
}
