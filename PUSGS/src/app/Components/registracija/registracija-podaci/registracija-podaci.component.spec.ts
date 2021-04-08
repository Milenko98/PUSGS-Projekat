import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaPodaciComponent } from './registracija-podaci.component';

describe('RegistracijaPodaciComponent', () => {
  let component: RegistracijaPodaciComponent;
  let fixture: ComponentFixture<RegistracijaPodaciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistracijaPodaciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistracijaPodaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
