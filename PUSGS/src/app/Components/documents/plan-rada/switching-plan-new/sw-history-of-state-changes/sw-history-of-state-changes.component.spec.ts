import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwHistoryOfStateChangesComponent } from './sw-history-of-state-changes.component';

describe('SwHistoryOfStateChangesComponent', () => {
  let component: SwHistoryOfStateChangesComponent;
  let fixture: ComponentFixture<SwHistoryOfStateChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwHistoryOfStateChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwHistoryOfStateChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
