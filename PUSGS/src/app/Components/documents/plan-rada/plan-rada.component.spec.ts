import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanRadaComponent } from './plan-rada.component';

describe('PlanRadaComponent', () => {
  let component: PlanRadaComponent;
  let fixture: ComponentFixture<PlanRadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanRadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanRadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
