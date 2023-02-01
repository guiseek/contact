import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SpeakerContainer} from './speaker.container'
import {DeviceListComponent} from '../../components'
import {UiLayoutModule, UiMaterialModule} from '@contact/shared/ui-layout'
import {NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms'
import {NO_ERRORS_SCHEMA, forwardRef} from '@angular/core'

describe('SpeakerContainer', () => {
  let component: SpeakerContainer
  let fixture: ComponentFixture<SpeakerContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiLayoutModule, ReactiveFormsModule, UiMaterialModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SpeakerContainer, DeviceListComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DeviceListComponent),
          multi: true,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SpeakerContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
