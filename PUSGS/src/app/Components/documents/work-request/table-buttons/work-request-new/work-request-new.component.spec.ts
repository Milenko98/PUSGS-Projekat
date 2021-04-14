import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkRequestNewComponent } from './work-request-new.component';

describe('WorkRequestNewComponent', () => {
  let component: WorkRequestNewComponent;
  let fixture: ComponentFixture<WorkRequestNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkRequestNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkRequestNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
