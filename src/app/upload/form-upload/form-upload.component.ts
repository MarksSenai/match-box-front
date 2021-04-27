import { UploadFileService } from './../upload-file.service';
import { UsersService } from './../../users/users.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { AppComponent } from './../../app.component';
import { Users } from './../../users/users.model';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {
  userCode: string;
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
   this.userService.regEmitEvent.subscribe((userCode : string)=>{
         this.userCode = userCode;
    });
    this.userService.userImageEvent.subscribe((user: Users) => {
      this.user = user;
      this.setDefaultImage();
    });
    this.imageUser = "assets/white-background-v.png";
    
  }

  setDefaultImage(){

    if (this.user.picture == null || this.user.picture == "") {
      this.imageUser = "assets/user-default.jpg";
    } else if (this.user.picture != null || this.user.picture != ""){
      this.userService.getUserImage(this.user.picture, this.userCode).subscribe((image: Blob) => {
        this.createImageFromBlob(image);
      });
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageUser = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
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

  upload(userCode) {
    this.uploadService.imageEvent.emit(this.selectedFile.name);
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    return this.http.post(AppComponent.path+'/upload/'+this.userCode, fd)
    .subscribe(response => {
    });
  }
}