import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WorkRequest } from 'src/app/Entities/work-request';
import { WorkRequestService } from 'src/app/Services/work-request.service';

@Component({
  selector: 'app-wr-multimedia',
  templateUrl: './wr-multimedia.component.html',
  styleUrls: ['./wr-multimedia.component.css']
})
export class WrMultimediaComponent implements OnInit{

  constructor(private wrService: WorkRequestService, private toastr: ToastrService, private http: HttpClient){}
  files: File[] = [];
  filename: string[];
  workRequestForEdit = this.wrService.GetWorkRequestForEdit();
  edited = false;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  ngOnInit(){
    if(this.workRequestForEdit !== undefined &&  this.workRequestForEdit !== null && this.workRequestForEdit.multimedia !== null)
    {
      this.workRequestForEdit.multimedia.forEach(element => {
        this.files.push(element.file);
      });
      
    }
  }


	onSelect(event) {
		console.log(event.name);
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
    if(this.workRequestForEdit != null)
    {
      this.edited = true;
    }
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
    this.wrService.AddMultimedia(this.files,this.edited);
	}

  onRemoveAll()
  {
    this.files.splice(0,this.files.length);
  }

  onAdd()
  {
    if(this.workRequestForEdit != null)
    {   
      this.edited = true;   
    }

    if (this.files.length === 0) {
      return;
    }
    let fileToUpload = <File[]>this.files;
    const formData = new FormData();
    fileToUpload.forEach(element => {
      formData.append('file', element, element.name);
    });
    
    this.http.post('https://localhost:44362/api/UploadFiles/Upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });

    this.wrService.AddMultimedia(this.files,this.edited); 
    this.toastr.success('Success added multimedia files','Success');
    }
}
