import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import {
  NgControl,
  FormControl,
  SelectControlValueAccessor,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  exportAs: 'contactDevices',
  selector: 'contact-devices',
  template: `
    <mat-selection-list
      cdkDropList
      [formControl]="formControl"
      (cdkDropListDropped)="drop($event)"
    >
      <mat-list-option
        cdkDrag
        *ngFor="let device of devices$ | async; index as i"
        [value]="device"
      >
        {{ i + 1 }}°. {{ device.label }}
      </mat-list-option>
    </mat-selection-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevicesComponent
  extends SelectControlValueAccessor
  implements OnInit
{
  private _devices = new BehaviorSubject<MediaDeviceInfo[]>([]);
  devices$ = this._devices.asObservable();

  @Input() kind: MediaDeviceKind = 'audioinput';

  @Output() valueChange = new EventEmitter<MediaDeviceInfo[]>();

  get formControl() {
    return this.ngControl.control as FormControl;
  }

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    readonly ngControl: NgControl
  ) {
    super(renderer, elementRef);

    ngControl.valueAccessor = this;
  }

  ngOnInit() {
    this.loadDevices();
    this.formControl.valueChanges.subscribe((value) => {
      this.valueChange.emit(value ?? []);
    });
    navigator.mediaDevices.ondevicechange = () => this.loadDevices();
  }

  protected loadDevices() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const filterFn = (device: MediaDeviceInfo) => device.kind === this.kind;
      const mapFn = (device: MediaDeviceInfo) => ({
        ...device.toJSON(),
        label: device.label.split('(').shift(),
      });
      this._devices.next(devices.filter(filterFn).map(mapFn));
    });
  }

  get firstSelectedDevice(): MediaDeviceInfo {
    return (this.formControl.value ?? [])[0];
  }

  drop(event: CdkDragDrop<MediaDeviceInfo[]>) {
    moveItemInArray(
      this._devices.value,
      event.previousIndex,
      event.currentIndex
    );
    if (!this.formControl.value) this.formControl.setValue([]);
    const newValue = this._devices.value.filter((device) =>
      this.formControl.value.includes(device)
    );
    this.formControl.setValue(newValue);
  }
}
