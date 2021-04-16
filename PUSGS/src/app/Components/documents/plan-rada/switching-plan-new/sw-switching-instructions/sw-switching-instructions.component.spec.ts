import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwSwitchingInstructionsComponent } from './sw-switching-instructions.component';

describe('SwSwitchingInstructionsComponent', () => {
  let component: SwSwitchingInstructionsComponent;
  let fixture: ComponentFixture<SwSwitchingInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwSwitchingInstructionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwSwitchingInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
