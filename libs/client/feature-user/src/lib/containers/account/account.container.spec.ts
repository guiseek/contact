import {ComponentFixture, TestBed} from '@angular/core/testing'

import {AccountContainer} from './account.container'

describe('AccountContainer', () => {
  let component: AccountContainer
  let fixture: ComponentFixture<AccountContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountContainer],
    }).compileComponents()

    fixture = TestBed.createComponent(AccountContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
