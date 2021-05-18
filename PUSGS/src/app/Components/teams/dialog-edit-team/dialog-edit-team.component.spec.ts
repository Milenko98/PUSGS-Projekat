import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditTeamComponent } from './dialog-edit-team.component';

describe('DialogEditTeamComponent', () => {
  let component: DialogEditTeamComponent;
  let fixture: ComponentFixture<DialogEditTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
