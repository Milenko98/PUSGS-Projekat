import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NewTeam } from 'src/app/Entities/new-team';
import { User } from 'src/app/Entities/user';
import { TeamServiceService } from 'src/app/Services/team-service.service';
import { Teams } from '../teams.component';
import {Router} from "@angular/router"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  courseForm!: FormGroup;
  newTeam = new  NewTeam;
  todo = new Array<User>();
  todoTemp = new Array<User>();
 // todo!:Array<User>;
  ngOnInit(): void {
    this.initForm();
    this.teamService.GiveUsersDB().subscribe((res: any) => {
      if (res !== null) {
        this.todo = res
        this.todoTemp= res;
      } else {
      }
    },
    err => {
      console.log('Error!');
      console.log(err);    
    });
    console.log("clanovi:"+this.todo);
    //this.Dobavljeni();
    //this.teamService.exusers.subscribe(item=>this.todo = item);
  }
  constructor(private fb: FormBuilder, private teamService: TeamServiceService, private router: Router, private toastr: ToastrService) { }

  //todo = this.teamService.giveExistingUsers();

  done = [
  ];

  onCancel() {
    this.courseForm.reset();
    this.router.navigate(['/teams'])
  }

  onSubmit() {
    let idCounter = 0;
    let users = this.Dobavljeni();
    let teamName = this.courseForm.value.name!;
    this.newTeam.name = teamName!;
    this.newTeam.teamMembers = users!;
    let obrnutaLista = this.teamService.getTeams();
    if(obrnutaLista.length == 0)
    this.newTeam.id = idCounter;
    else
    this.newTeam.id = obrnutaLista[obrnutaLista.length - 1].id + 1;
    this.teamService.addNewTeam(this.newTeam);  
    this.toastr.success("Uspesno ste kreirali tim!", "Success");
    this.router.navigate(['/teams']);
  }

  private initForm() {
    this.courseForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    });
  }

  drop(event: CdkDragDrop<Array<User>>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.teamService.ChoosenMembers(event.container.data)
    //this.Dobavljeni();
  }

  Dobavljeni():Array<User> {
    let useri = this.teamService.getUsers();
    return useri;
    console.log(useri);
  }
}