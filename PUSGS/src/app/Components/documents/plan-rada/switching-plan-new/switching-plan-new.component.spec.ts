import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchingPlanNewComponent } from './switching-plan-new.component';

describe('SwitchingPlanNewComponent', () => {
  let component: SwitchingPlanNewComponent;
  let fixture: ComponentFixture<SwitchingPlanNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchingPlanNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchingPlanNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
