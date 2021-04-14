import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrMultimediaComponent } from './wr-multimedia.component';

describe('WrMultimediaComponent', () => {
  let component: WrMultimediaComponent;
  let fixture: ComponentFixture<WrMultimediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrMultimediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
