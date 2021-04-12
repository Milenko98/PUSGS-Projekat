import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosPodatakaComponent } from './unos-podataka.component';

describe('UnosPodatakaComponent', () => {
  let component: UnosPodatakaComponent;
  let fixture: ComponentFixture<UnosPodatakaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnosPodatakaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnosPodatakaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
