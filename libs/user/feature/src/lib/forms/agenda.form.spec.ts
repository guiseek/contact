import {ComponentFixture, TestBed} from '@angular/core/testing'

import {AgendaForm} from './agenda.form'
import {Component} from '@angular/core'

@Component({
  selector: 'user-agenda-form-test',
})
class AgendaFormComponent {
  form = new AgendaForm()
}

describe('AgendaForm', () => {
  let component: AgendaFormComponent
  let fixture: ComponentFixture<AgendaFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendaFormComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AgendaFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
