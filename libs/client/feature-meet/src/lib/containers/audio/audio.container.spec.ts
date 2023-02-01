import {ComponentFixture, TestBed} from '@angular/core/testing'
import {DeviceListComponent} from '../../components'
import {UiLayoutModule, UiMaterialModule} from '@contact/shared/ui-layout'
import {NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms'
import {NO_ERRORS_SCHEMA, forwardRef} from '@angular/core'
import {AudioContainer} from './audio.container'

describe('AudioContainer', () => {
  let component: AudioContainer
  let fixture: ComponentFixture<AudioContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiLayoutModule, ReactiveFormsModule, UiMaterialModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DeviceListComponent),
          multi: true,
        },
      ],
      declarations: [AudioContainer, DeviceListComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AudioContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
