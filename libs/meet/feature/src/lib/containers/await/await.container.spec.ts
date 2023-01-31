import {ComponentFixture, TestBed} from '@angular/core/testing'

import {AwaitContainer} from './await.container'

describe('AwaitContainer', () => {
  let component: AwaitContainer
  let fixture: ComponentFixture<AwaitContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AwaitContainer],
    }).compileComponents()

    fixture = TestBed.createComponent(AwaitContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
