import {RouterTestingModule} from '@angular/router/testing'
import {ComponentFixture, TestBed} from '@angular/core/testing'

import {SettingsContainer} from './settings.container'
import {UiMaterialModule} from '@contact/client/shared/ui-layout'

describe('SettingsContainer', () => {
  let component: SettingsContainer
  let fixture: ComponentFixture<SettingsContainer>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, UiMaterialModule],
      declarations: [SettingsContainer],
    }).compileComponents()

    fixture = TestBed.createComponent(SettingsContainer)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
