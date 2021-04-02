import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPrijavaComponent } from './body-prijava.component';

describe('BodyPrijavaComponent', () => {
  let component: BodyPrijavaComponent;
  let fixture: ComponentFixture<BodyPrijavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyPrijavaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyPrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
