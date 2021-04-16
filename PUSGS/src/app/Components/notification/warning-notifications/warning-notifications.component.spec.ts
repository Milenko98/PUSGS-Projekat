import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningNotificationsComponent } from './warning-notifications.component';

describe('WarningNotificationsComponent', () => {
  let component: WarningNotificationsComponent;
  let fixture: ComponentFixture<WarningNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
