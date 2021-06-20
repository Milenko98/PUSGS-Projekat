import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { TeamServiceService } from 'src/app/Services/team-service.service';
import { NewTeam } from 'src/app/Entities/new-team';
import { MatDialog } from '@angular/material/dialog';
import { DialogViewTeamMembersComponent } from './dialog-view-team-members/dialog-view-team-members.component';
import { DialogEditTeamComponent } from './dialog-edit-team/dialog-edit-team.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'teamMembers', 'edit', 'delete'];
  dataSource: MatTableDataSource<NewTeam> = new MatTableDataSource([]);
  teams! : Array<NewTeam>;
  team!: Teams;
  ime!:string[];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private teamService: TeamServiceService, public dialog: MatDialog, private toastr: ToastrService) {

    
  }
  ngOnInit(): void {
    this.teamService.GetTeamDB().subscribe((res: any) => {
      if (res !== null) {
        this.teams = res;
        this.dataSource = new MatTableDataSource(this.teams);
        this.ngAfterViewInit();
        this.editTeam();
      } else {
      }
    },
    err => {
      console.log('Error!');
      console.log(err);    
    });
    //this.teams = this.teamService.getTeams();


  }

  ngAfterViewInit() 
  {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  applyFilter(event: Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewMembers(id){
    this.teamService.sendId(id);
    this.dialog.open(DialogViewTeamMembersComponent);
    this.ngOnInit();
  }

  editTeam()
  {
    let editedTeam = this.teamService.giveEditedTeam();
    if(editedTeam !== null){
      this.teams.forEach(element => {
        if(element.id == editedTeam.id){
          element.id = editedTeam.id;
          element.name = editedTeam.name;
          element.teamMembers = editedTeam.teamMembers;
        }
      });
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    else{

    }
  }

  Edit(id)
  {
    let editTeam = new NewTeam;
    this.teams.forEach(element => {
      if(element.id == id){
        editTeam.id = element.id;
        editTeam.name = element.name;
        editTeam.teamMembers = element.teamMembers;
      }
    });

    this.teamService.sendEditTeam(editTeam);
    this.dialog.open(DialogEditTeamComponent,{width:'500px',height:'500px'});
  }

  Delete(i)
  {
    // console.log(i);
    // console.log(this.teams);
    // this.dataSource.data.splice(i,1);
    // this.dataSource._updateChangeSubscription();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.teamService.DeleteTeamDB(i).subscribe((res: any) => {
      if (res !== null) {
        this.dataSource = new MatTableDataSource(this.teams);
        this.ngAfterViewInit();
        this.editTeam();
        this.toastr.success("Uspesno brisanje tima","Success!");
      } else {
      }
    },
    err => {
      console.log('Error!');
      console.log(err);  
      this.toastr.warning("Neuspesno brisanje tima","Error!");  
    });
  }
}

export interface Teams {
  id: number;
  name : string;
}
