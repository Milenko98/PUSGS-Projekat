import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewTeamMembersComponent } from './dialog-view-team-members.component';

describe('DialogViewTeamMembersComponent', () => {
  let component: DialogViewTeamMembersComponent;
  let fixture: ComponentFixture<DialogViewTeamMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogViewTeamMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogViewTeamMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
