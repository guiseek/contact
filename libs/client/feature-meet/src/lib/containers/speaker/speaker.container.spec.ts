import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SpeakerContainer} from './speaker.container'

describe('SpeakerContainer', () => {
  let component: SpeakerContainer
  let fixture: ComponentFixture<SpeakerContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeakerContainer],
    }).compileComponents()

    fixture = TestBed.createComponent(SpeakerContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
