import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessNotificationsComponent } from './success-notifications.component';

describe('SuccessNotificationsComponent', () => {
  let component: SuccessNotificationsComponent;
  let fixture: ComponentFixture<SuccessNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
