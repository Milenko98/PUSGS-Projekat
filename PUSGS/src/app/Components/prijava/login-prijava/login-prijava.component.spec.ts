import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPrijavaComponent } from './login-prijava.component';

describe('LoginPrijavaComponent', () => {
  let component: LoginPrijavaComponent;
  let fixture: ComponentFixture<LoginPrijavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPrijavaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
