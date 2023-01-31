import {ComponentFixture, TestBed} from '@angular/core/testing'

import {HomeContainer} from './home.container'

describe('HomeContainer', () => {
  let component: HomeContainer
  let fixture: ComponentFixture<HomeContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeContainer],
    }).compileComponents()

    fixture = TestBed.createComponent(HomeContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
