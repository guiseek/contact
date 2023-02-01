import {Component, inject} from '@angular/core'
import {NavigationService} from './navigation.service'

@Component({
  selector: 'contact-navigation,nav[contact-navigation]',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  service = inject(NavigationService)
}
