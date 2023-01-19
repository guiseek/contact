import {ComponentFixture, TestBed} from '@angular/core/testing'

import {DeviceContainer} from './device.container'

describe('DeviceContainer', () => {
  let component: DeviceContainer
  let fixture: ComponentFixture<DeviceContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceContainer],
    }).compileComponents()

    fixture = TestBed.createComponent(DeviceContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
