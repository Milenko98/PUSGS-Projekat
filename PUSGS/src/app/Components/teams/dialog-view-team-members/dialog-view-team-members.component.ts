import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { NewTeam } from 'src/app/Entities/new-team';
import { User } from 'src/app/Entities/user';
import { TeamServiceService } from 'src/app/Services/team-service.service';

@Component({
  selector: 'app-dialog-view-team-members',
  templateUrl: './dialog-view-team-members.component.html',
  styleUrls: ['./dialog-view-team-members.component.css']
})
export class DialogViewTeamMembersComponent implements OnInit {

  id!: number;
  users: Array<User> = [];

  constructor(public teamService: TeamServiceService) { }

  ngOnInit(): void {
    this.id = this.teamService.giveId();
    let teams = this.teamService.getTeams();
    teams.forEach(element1 => {
      element1.teamMembers.forEach(element2 => {
        if(element1.id == this.id){
          this.users.push(element2);
        }
      }); 
    });
  }
}
