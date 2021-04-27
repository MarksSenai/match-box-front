import { UsersService } from './../users/users.service';
import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Report } from '../shared/report.model';
import { Home } from '../shared/home.model';
  
@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.css']
})
export class HomeItemComponent implements OnInit {
  @Input() homes: Report[];
  homeShow: any[] = [];
  @Input() imageUserArray: any[] = [];
  url = window.URL || (window as any).webkitURL;

  constructor(private homeService: HomeService,
              private userService: UsersService) { }

  ngOnInit() {
    this.homeService.homeUpdateEvent.subscribe((home: Report[]) => {
    this.homes = home;
    this.homeShowBuild();
   });
  }
  
  homeShowBuild(){
    for (var i = 0; i < this.homes.length; i++) {
          let home = {id: 0, user: "", rfid: "", login:"", loginDate: "", imageShow: null, machine: "" };
          home.id = this.homes[i].id;
          home.user = this.homes[i].user;
          home.rfid = this.homes[i].rfid;
          home.machine = this.homes[i].machine
          home.imageShow = this.createImageFromBlob(this.imageUserArray[i]);
          
          home.login = this.homes[i].login;
          home.loginDate = this.homes[i].loginDate;
          this.homeShow.push(home);
      }
  }

 setUserData(){

 }

 createImageFromBlob(image): any {
  let reader = new FileReader();
  reader.addEventListener("load", () => {
    image = reader.result;
    return image;
  }, false);

  if (image) {
    return reader.readAsDataURL(image);
  }
}
}
