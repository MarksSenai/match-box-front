import { Users } from './../users/users.model';
import { UsersService } from './../users/users.service';
import { Component, OnInit, Input } from '@angular/core';
import { Report } from '../shared/report.model'
import { ReportService } from '../reports/report.service';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.css']
})
export class ReportItemComponent implements OnInit {
  @Input() reportList: Report[];
  @Input() userList: Users[];
  limit: number = 100;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
      this.reportService.getReports(this.limit).subscribe((reports: Report[])=>{
        this.reportList = reports;
      });
      this.reportService.reportUpdateEvent.subscribe((reports: Report[])=>{
        this.reportList = reports;
      });
  }
}
