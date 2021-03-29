import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPrijavaComponent } from './header-prijava.component';

describe('HeaderPrijavaComponent', () => {
  let component: HeaderPrijavaComponent;
  let fixture: ComponentFixture<HeaderPrijavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderPrijavaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
