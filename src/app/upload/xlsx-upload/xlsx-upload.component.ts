import { Component, OnInit } from '@angular/core';
import { UploadFileService } from './../upload-file.service';
import { UsersService } from './../../users/users.service';
import { HttpClientModule, HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { AppComponent } from './../../app.component';
import { Users } from './../../users/users.model';

@Component({
  selector: 'app-xlsx-upload',
  templateUrl: './xlsx-upload.component.html',
  styleUrls: ['./xlsx-upload.component.css']
})
export class XlsxUploadComponent implements OnInit {

  fileCode: string = 'fileForImport';
  selectedFile: File = null;
  currentFileUpload: File
  reader = new FileReader();
  progress: { percentage: number } = { percentage: 0 }
  user : Users;
  imageUser: any;
  url = window.URL || (window as any).webkitURL;

  constructor(private http: HttpClient,
    private userService: UsersService,
    private uploadService: UploadFileService) {}

  ngOnInit() {
  }

  selectFile(event) {
    
    if(event.target.files && event.target.files[0]) {
      this.selectedFile = <File>event.target.files[0]; 
   
      this.reader.readAsDataURL(event.target.files[0]);
      this.reader.onload = (event) => { // called once readAsDataURL is completed
      this.imageUser = this.url.createObjectURL(this.selectedFile)
    }

    }
  }

  upload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    return this.http.post(AppComponent.path+'/uploadUsersFile/'+this.fileCode, fd)
    .subscribe(response => {
    });
  }

  import() {
    return this.http.get(AppComponent.path+'/userimport')
    .subscribe(response => {
    });
  }

}
