import {ComponentFixture, TestBed} from '@angular/core/testing'

import {AgendaContainer} from './agenda.container'

describe('AgendaContainer', () => {
  let component: AgendaContainer
  let fixture: ComponentFixture<AgendaContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendaContainer],
    }).compileComponents()

    fixture = TestBed.createComponent(AgendaContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
