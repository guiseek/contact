import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetFeatureComponent } from './meet-feature.component';

describe('MeetFeatureComponent', () => {
  let component: MeetFeatureComponent;
  let fixture: ComponentFixture<MeetFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MeetFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
