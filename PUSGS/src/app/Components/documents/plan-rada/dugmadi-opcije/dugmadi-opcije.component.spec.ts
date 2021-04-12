import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DugmadiOpcijeComponent } from './dugmadi-opcije.component';

describe('DugmadiOpcijeComponent', () => {
  let component: DugmadiOpcijeComponent;
  let fixture: ComponentFixture<DugmadiOpcijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DugmadiOpcijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DugmadiOpcijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
