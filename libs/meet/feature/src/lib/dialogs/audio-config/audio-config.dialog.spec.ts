import {ComponentFixture, TestBed} from '@angular/core/testing'

import {AudioConfigDialog} from './audio-config.dialog'

describe('AudioConfigDialog', () => {
  let component: AudioConfigDialog
  let fixture: ComponentFixture<AudioConfigDialog>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioConfigDialog],
    }).compileComponents()

    fixture = TestBed.createComponent(AudioConfigDialog)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
