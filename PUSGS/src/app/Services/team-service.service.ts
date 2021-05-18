import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NewTeam } from '../Entities/new-team';
import { User } from '../Entities/user';
@Injectable({
  providedIn: 'root'
})
export class TeamServiceService {

  user!: User;
  users!: Array<User>;
  existingUsers!:Array<User>;
  teams : Array<NewTeam> = [];
  id!: number;
  editTeam = new NewTeam;
  editedTeam = new NewTeam;

  private usersList = new BehaviorSubject(this.users);
  public objekat = this.usersList.asObservable();

  // private existusers = new BehaviorSubject(this.existingUsers);
  // public exusers = this.existusers.asObservable();

  // private idd = new BehaviorSubject(this.id);
  // public iddd = this.idd.asObservable();

  constructor() {

    this.existingUsers = [{name:'Milenko', lastname:'Pjaca'},
    {name:'Jovan', lastname:'Jovic'},
    {name:'Zoki', lastname:'Zokic'},
    {name:'Ivan', lastname:'Ivic'}
    ]
   }

   ChoosenMembers(users: Array<User>)
  {
    this.users=users;
  }

  addNewTeam(newteam : NewTeam)
  {
    this.teams.push(newteam);
  }

  getTeams():Array<NewTeam>
  {
    return this.teams;
  }

  giveExistingUsers()
  {
    return this.existingUsers;
  }

  getUsers():Array<User>
  {
    return this.users;
  }

  sendId(id : number){
    this.id = id;
  }

  giveId():number
  {
    return this.id;
  }

  sendEditTeam(editteam: NewTeam)
  {
    this.editTeam = editteam;
  }

  giveEditTeam()
  {
    return this.editTeam;
  }

  sendEditedTeam(editteam: NewTeam)
  {
    this.editedTeam = editteam;
  }

  giveEditedTeam()
  {
    return this.editedTeam;
  }
}
