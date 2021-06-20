import { HttpClient } from '@angular/common/http';
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
  readonly BaseURI = 'https://localhost:44362/api';

  private usersList = new BehaviorSubject(this.users);
  public objekat = this.usersList.asObservable();

  // private existusers = new BehaviorSubject(this.existingUsers);
  // public exusers = this.existusers.asObservable();

  // private idd = new BehaviorSubject(this.id);
  // public iddd = this.idd.asObservable();

  constructor(private http: HttpClient) {

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

  AddTeamDB(team: NewTeam){
    return this.http.post(this.BaseURI + '/Team/AddTeam', team);
  }

  GetTeamDB(){
    return this.http.get<NewTeam>(this.BaseURI + '/Team/GetTeams');
  }

  addNewTeam(newteam : NewTeam)
  {
    this.AddTeamDB(newteam).subscribe((res: any) => {
      if (res !== null) {
        console.log("Uspesno dodati timovi");
      } else {
      }
    },
    err => {
      console.log('Error!');
      console.log(err);    
    });
    this.teams.push(newteam);
  }

  getTeams()
  {
    this.GetTeamDB().subscribe((res: any) => {
      if (res !== null) 
      {
        this.teams = res;
        console.log("res\n"+ JSON.stringify(res));
        console.log("Dovaljeni timovi iz baze\n"+ JSON.stringify(this.teams));
      } 
      else 
      {
      }
    },
    err => {
      console.log(err);    
    });
    return this.teams;
  }

  DeleteTeamDB(id:number)
  {
    return this.http.post(this.BaseURI + '/Team/DeleteTeam/'+id,id);
  }

  UpdateTeamDB(team: NewTeam)
  {
    return this.http.post(this.BaseURI + '/Team/UpdateTeam',team);
  }

  GiveUsersDB()
  {
    return this.http.get<User>(this.BaseURI + '/User/GetUsers');
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
