import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorNotificationsComponent } from './error-notifications.component';

describe('ErrorNotificationsComponent', () => {
  let component: ErrorNotificationsComponent;
  let fixture: ComponentFixture<ErrorNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
