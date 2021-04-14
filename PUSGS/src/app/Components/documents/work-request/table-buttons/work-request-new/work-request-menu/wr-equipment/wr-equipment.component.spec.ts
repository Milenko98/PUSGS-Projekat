import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrEquipmentComponent } from './wr-equipment.component';

describe('WrEquipmentComponent', () => {
  let component: WrEquipmentComponent;
  let fixture: ComponentFixture<WrEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
