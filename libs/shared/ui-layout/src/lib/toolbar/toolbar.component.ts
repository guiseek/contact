import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core'
import {ThemePalette} from '@angular/material/core'
import {AuthUserLogged} from '@contact/type'

@Component({
  selector: 'contact-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent {
  @Input() user?: AuthUserLogged
  @Input() color: ThemePalette = 'primary'
  @Input() goBackRoute: string | string[] = ['/']

  @Input() showToggleMenu = false
  @Output() menuToggled = new EventEmitter<void>()
}
