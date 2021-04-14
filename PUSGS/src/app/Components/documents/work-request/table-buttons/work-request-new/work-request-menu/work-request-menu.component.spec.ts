import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkRequestMenuComponent } from './work-request-menu.component';

describe('WorkRequestMenuComponent', () => {
  let component: WorkRequestMenuComponent;
  let fixture: ComponentFixture<WorkRequestMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkRequestMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkRequestMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
