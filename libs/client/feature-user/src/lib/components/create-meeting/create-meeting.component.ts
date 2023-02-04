import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {AgendaForm} from '../../forms'
import {CreateMeeting} from '@contact/shared/types'

@Component({
  selector: 'user-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMeetingComponent implements OnInit, OnDestroy {
  form = new AgendaForm()

  @Output() createMeeting = new EventEmitter<CreateMeeting>()

  onSubmit() {
    if (this.form.valid) {
      this.createMeeting.emit(this.form.value)
    } else {
      this.form.markAllAsTouched()
    }
  }

  ngOnInit() {
    this.form.initHandler()
  }

  ngOnDestroy() {
    this.form.cancelHandler()
  }
}
