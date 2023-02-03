import {ComponentFixture, TestBed} from '@angular/core/testing'

import {MeetDialog} from './meet.dialog'

describe('MeetDialog', () => {
  let component: MeetDialog
  let fixture: ComponentFixture<MeetDialog>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetDialog],
    }).compileComponents()

    fixture = TestBed.createComponent(MeetDialog)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
