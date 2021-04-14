import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrBasicInfoComponent } from './wr-basic-info.component';

describe('WrBasicInfoComponent', () => {
  let component: WrBasicInfoComponent;
  let fixture: ComponentFixture<WrBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
