import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsCoreComponent } from './documents-core.component';

describe('DocumentsCoreComponent', () => {
  let component: DocumentsCoreComponent;
  let fixture: ComponentFixture<DocumentsCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
