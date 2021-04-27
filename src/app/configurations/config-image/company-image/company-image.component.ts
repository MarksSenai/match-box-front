import { ConfigService } from './../../config.service';
import { AppComponent } from './../../../app.component';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-company-image',
  templateUrl: './company-image.component.html',
  styleUrls: ['./company-image.component.css']
})
export class CompanyImageComponent implements OnInit {
  companyCode: string;
  selectedFile: File = null;
  currentFileUpload: File
  reader = new FileReader();
  progress: { percentage: number } = { percentage: 0 }
  // user : Users;
  companyLogo: any;
  url = window.URL || (window as any).webkitURL;

  constructor(private http: HttpClient,
     private configService: ConfigService) { }

  ngOnInit() {
    this.getcompanyLogo();
    this.companyLogo = "assets/white-background-h.png";
  }

  getcompanyLogo(){
    this.configService.getCompanyLogo().subscribe((image: Blob) => {  
      this.createImageFromBlob(image)
    } , (error) => {
      this.companyLogo = "assets/psl-machines.png"
    });        
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.companyLogo = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

  selectFile(event) {
    if(event.target.files && event.target.files[0]) {
      this.selectedFile = <File>event.target.files[0]; 
      this.reader.readAsDataURL(event.target.files[0]);
      this.reader.onload = (event) => { 
      this.companyLogo = this.url.createObjectURL(this.selectedFile)
      }
    }
  }

  upload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    return this.http.post(AppComponent.path+'/uploadCompanyImage/', fd)
    .subscribe(response => {
    });
  }
}