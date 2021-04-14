import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrHistoryOfStateChangesComponent } from './wr-history-of-state-changes.component';

describe('WrHistoryOfStateChangesComponent', () => {
  let component: WrHistoryOfStateChangesComponent;
  let fixture: ComponentFixture<WrHistoryOfStateChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrHistoryOfStateChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrHistoryOfStateChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
