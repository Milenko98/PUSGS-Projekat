import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwEquipmentComponent } from './sw-equipment.component';

describe('SwEquipmentComponent', () => {
  let component: SwEquipmentComponent;
  let fixture: ComponentFixture<SwEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
