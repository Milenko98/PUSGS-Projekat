import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsPieComponent } from './documents-pie.component';

describe('DocumentsPieComponent', () => {
  let component: DocumentsPieComponent;
  let fixture: ComponentFixture<DocumentsPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
