import { ConfigService } from './../../configurations/config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remote-logo',
  templateUrl: './remote-logo.component.html',
  styleUrls: ['./remote-logo.component.css']
})
export class RemoteLogoComponent implements OnInit {
  companyLogo: any;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.companyLogo = "assets/white-background-h.png";
    this.getcompanyLogo();
  }

  getcompanyLogo(){
    this.configService.getCompanyLogo().subscribe((compLogo: Blob) => {  
      this.createImageFromBlob(compLogo)
    } , (error) => {

      if (error.status == 500) {
        console.log("LOGO ERROR", error);
        this.companyLogo = "assets/psl-machines.png"
      }
      
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

}
