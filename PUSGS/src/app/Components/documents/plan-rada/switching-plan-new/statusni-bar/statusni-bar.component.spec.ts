import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusniBarComponent } from './statusni-bar.component';

describe('StatusniBarComponent', () => {
  let component: StatusniBarComponent;
  let fixture: ComponentFixture<StatusniBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusniBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusniBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
