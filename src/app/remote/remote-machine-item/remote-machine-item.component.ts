import { RemoteService } from './../remote.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remote-machine-item',
  templateUrl: './remote-machine-item.component.html',
  styleUrls: ['./remote-machine-item.component.css']
})
export class RemoteMachineItemComponent implements OnInit {
  public machine : any;

  constructor(private remoteService : RemoteService) { }

  ngOnInit() {
    this.remoteService.remoteEvent.subscribe((machine : any) => {
      this.machine = machine;
    })
  }

}
