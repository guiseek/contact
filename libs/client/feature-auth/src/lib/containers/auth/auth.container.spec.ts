import {ComponentFixture, TestBed} from '@angular/core/testing'

import {AuthContainer} from './auth.container'

describe('AuthContainer', () => {
  let component: AuthContainer
  let fixture: ComponentFixture<AuthContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthContainer],
    }).compileComponents()

    fixture = TestBed.createComponent(AuthContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
