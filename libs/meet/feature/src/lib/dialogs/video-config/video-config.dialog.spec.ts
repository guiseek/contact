import {ComponentFixture, TestBed} from '@angular/core/testing'

import {VideoConfigDialog} from './video-config.dialog'

describe('VideoConfigDialog', () => {
  let component: VideoConfigDialog
  let fixture: ComponentFixture<VideoConfigDialog>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoConfigDialog],
    }).compileComponents()

    fixture = TestBed.createComponent(VideoConfigDialog)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
