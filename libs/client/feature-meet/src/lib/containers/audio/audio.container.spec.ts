import {ComponentFixture, TestBed} from '@angular/core/testing'

import {AudioContainer} from './audio.container'

describe('AudioContainer', () => {
  let component: AudioContainer
  let fixture: ComponentFixture<AudioContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioContainer],
    }).compileComponents()

    fixture = TestBed.createComponent(AudioContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
