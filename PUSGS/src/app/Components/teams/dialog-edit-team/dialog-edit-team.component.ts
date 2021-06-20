import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewTeam } from 'src/app/Entities/new-team';
import { User } from 'src/app/Entities/user';
import { TeamServiceService } from 'src/app/Services/team-service.service';

@Component({
  selector: 'app-dialog-edit-team',
  templateUrl: './dialog-edit-team.component.html',
  styleUrls: ['./dialog-edit-team.component.css']
})
export class DialogEditTeamComponent implements OnInit {

  courseForm!: FormGroup;
  deletedTeamMembers = [];
  editTeam = new  NewTeam;
  existingTeamMembers: Array<User>=[];
  constructor(private fb: FormBuilder, private teamService: TeamServiceService, private router: Router, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.editTeam = this.teamService.giveEditTeam();
    this.existingTeamMembers = this.editTeam.teamMembers;
    console.log(this.editTeam.name+this.editTeam.teamMembers);
    this.initForm();
  }
  

  private initForm() {
    this.courseForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    });
    this.courseForm.get('name').setValue(this.editTeam.name!);
  }

  drop(event: CdkDragDrop<Array<User>>)
   {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onCancel() {
    //this.courseForm.reset();
    this.dialog.closeAll();
    console.log(this.existingTeamMembers);
  }

  onSubmit() {
    let editedTeam = new NewTeam;
    editedTeam.id = this.editTeam.id;
    editedTeam.name = this.courseForm.value.name;
    editedTeam.teamMembers = this.existingTeamMembers;
    this.teamService.sendEditedTeam(editedTeam);
    this.teamService.UpdateTeamDB(editedTeam).subscribe((res: any) => {
      if (res !== null) {
        this.toastr.success("Uspesan update tima!","Success!");
      } else {
      }
    },
    err => {
      console.log('Error!');
      console.log(err);  
      this.toastr.warning("Neuspesan update tima!","Error!");  
    });
    this.dialog.closeAll();
  }

}
