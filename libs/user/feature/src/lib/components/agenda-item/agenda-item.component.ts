import {Component, EventEmitter, Input, Output} from '@angular/core'
import {AgendaItemAction, AgendaResponse} from '@contact/type'

@Component({
  selector: 'user-agenda-item',
  templateUrl: './agenda-item.component.html',
})
export class AgendaItemComponent {
  @Input() agenda?: AgendaResponse

  @Output() action = new EventEmitter<[AgendaItemAction, AgendaResponse]>()
}
