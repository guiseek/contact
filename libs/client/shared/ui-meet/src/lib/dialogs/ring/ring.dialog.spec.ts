import {ComponentFixture, TestBed} from '@angular/core/testing'

import {RingDialog} from './ring.dialog'

describe('RingDialog', () => {
  let component: RingDialog
  let fixture: ComponentFixture<RingDialog>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RingDialog],
    }).compileComponents()

    fixture = TestBed.createComponent(RingDialog)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
