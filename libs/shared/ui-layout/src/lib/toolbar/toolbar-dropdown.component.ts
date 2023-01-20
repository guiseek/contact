import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import {Observable} from 'rxjs'

interface ToolbarDropdownUser {
  id: number | string
  username: string
  email: string
}

interface ToolbarDropdownItem {
  action: number | string
  label: string
}

@Component({
  selector: 'contact-toolbar-dropdown',
  templateUrl: './toolbar-dropdown.component.html',
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarDropdownComponent {
  @Input() user?: Observable<ToolbarDropdownUser | null>
  @Input() items?: Observable<ToolbarDropdownItem[] | null>

  @Output() menuClicked = new EventEmitter<string | number>()
}
