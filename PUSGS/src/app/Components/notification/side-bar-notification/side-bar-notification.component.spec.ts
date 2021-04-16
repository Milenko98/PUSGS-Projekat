import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarNotificationComponent } from './side-bar-notification.component';

describe('SideBarNotificationComponent', () => {
  let component: SideBarNotificationComponent;
  let fixture: ComponentFixture<SideBarNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
