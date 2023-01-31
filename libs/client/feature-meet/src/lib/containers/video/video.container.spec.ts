import {ComponentFixture, TestBed} from '@angular/core/testing'

import {VideoContainer} from './video.container'

describe('VideoContainer', () => {
  let component: VideoContainer
  let fixture: ComponentFixture<VideoContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoContainer],
    }).compileComponents()

    fixture = TestBed.createComponent(VideoContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
