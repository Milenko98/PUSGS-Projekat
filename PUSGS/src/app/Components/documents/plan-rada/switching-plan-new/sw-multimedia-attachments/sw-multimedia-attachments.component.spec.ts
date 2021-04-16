import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwMultimediaAttachmentsComponent } from './sw-multimedia-attachments.component';

describe('SwMultimediaAttachmentsComponent', () => {
  let component: SwMultimediaAttachmentsComponent;
  let fixture: ComponentFixture<SwMultimediaAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwMultimediaAttachmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwMultimediaAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
