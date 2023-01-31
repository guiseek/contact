import {ComponentFixture, TestBed} from '@angular/core/testing'

import {RoomContainer} from './room.container'

describe('RoomContainer', () => {
  let component: RoomContainer
  let fixture: ComponentFixture<RoomContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomContainer],
    }).compileComponents()

    fixture = TestBed.createComponent(RoomContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
