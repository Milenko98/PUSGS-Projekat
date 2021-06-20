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
 // todo!:Array<User>;
  ngOnInit(): void {
    this.initForm();
    this.teamService.GiveUsersDB().subscribe((res: any) => {
      if (res !== null) {
        this.todo = res
      } else {
      }
    },
    err => {
      console.log('Error!');
      console.log(err);    
    });
    console.log(this.todo);
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

  //   courseForm!: FormGroup;
  //   dropdownList;
  //   dropdownSettings;
  //   userss!: Array<string>;

  //   constructor(private fb:FormBuilder) { }

  //   ngOnInit(): void {
  //     this.initForm();
  //     this.userss = ['da','dada','gdsgds'];
  //     this.dropdownList = this.getData();
  //     this.dropdownSettings = {
  //       singleSelection:false,
  //       idField : 'item_id',
  //       textField : 'text_name',
  //       selectAllText : 'Select All',
  //       unSelectAllText : 'UnSelect All',
  //       allowSearchFilter : true
  //     };

  //   }

  //   private initForm() {
  //     this.courseForm = this.fb.group({
  //       name: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
  //       users: new FormControl('', [Validators.required]),
  //     });
  //   }

  // onSubmit(){
  //   alert("Uspesna registracija");
  // }

  // onClear()
  // {
  //   this.courseForm.reset();
  // }

  // onItemSelect($event)
  // {
  //   console.log('$event is ', $event);
  // }
  // getData():Array<any>
  // {
  // return [
  //   {item_id: 1,text_name:'Ime1', group:'F'},
  //   {item_id: 2, text_name:'Ime2', group:'C'},
  //   {item_id: 3, text_name:'Ime3', group:'D'}
  // ]
  // }
}

// displayedColumns: string[] = ['id', 'name', 'lastname','add'];
//   dataSource: MatTableDataSource<Team>;
//   team! : Array<Team>;
//   name! :string;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor(private teamService: TeamServiceService) {
//     this.team = [{id: 1, name:"zzz",lastname:"s"},
//     {id:2, name:"c",lastname:"sd"},
//     {id:3, name:"d",lastname:"g"},
//     {id:4, name:"a",lastname:"h"},
//     {id:5, name:"e",lastname:"j"},
//     {id:6, name:"w",lastname:"k"}]

//     this.dataSource = new MatTableDataSource(this.team);
//   }
//   ngOnInit(): void {

//   }

//   ngAfterViewInit() 
//   {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }

//   applyFilter(event: Event) 
//   {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }

//   Izabran(ime)
//   {
//     let temp = this.team.find(x=> x.name === ime)!;
//      this.teamService.saljiObjekat(temp);
//   }


//   Saljii(text)
//   {
//     this.teamService.add(text);
//   }


// }

// export interface Team {
//   id: number;
//   name : string;
//   lastname : string;
// }
