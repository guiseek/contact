import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core'
import {
  FormControl,
  NgControl,
  SelectControlValueAccessor,
} from '@angular/forms'
import {BehaviorSubject} from 'rxjs'

interface OptionItem {
  value: number
  label: string
}

@Component({
  exportAs: 'contactResolutions',
  selector: 'contact-resolutions',
  template: `
    <mat-form-field>
      <mat-label>Resolução</mat-label>
      <mat-select [formControl]="formControl">
        <mat-option
          *ngFor="let resolution of resolutions$ | async"
          [value]="resolution"
        >
          {{ resolution.label }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResolutionsComponent
  extends SelectControlValueAccessor
  implements OnInit
{
  private _resolutions = new BehaviorSubject<OptionItem[]>([])
  resolutions$ = this._resolutions.asObservable()

  private _range: ULongRange = {
    max: 720,
    min: 0,
  }
  get range() {
    return this._range ?? {}
  }
  @Input()
  set range(value: ULongRange | null) {
    if (value) {
      this._range = value
      this.loadOptions(value)
    }
  }

  get formControl() {
    return this.ngControl.control as FormControl
  }

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    readonly ngControl: NgControl
  ) {
    super(renderer, elementRef)
    ngControl.valueAccessor = this
  }

  loadOptions(range: ULongRange) {
    this._resolutions.next(
      [
        {value: 360, label: 'Baixa definição (360p)'},
        {value: 480, label: 'Definição padrão (480p)'},
        {value: 720, label: 'Alta definição (720p)'},
        {value: 1080, label: 'Definição Full HD (1080p)'},
      ].filter((option) => {
        const {min = 0, max = 480} = range ?? {}
        return option.value >= min && option.value <= max
      })
    )
  }

  ngOnInit() {
    if (this.range) {
      this.loadOptions(this.range)
    }
  }
}
