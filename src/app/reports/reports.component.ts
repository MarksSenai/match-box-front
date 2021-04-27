import { ReportService } from './report.service';
import { Component, OnInit } from '@angular/core';
import { Report } from '../shared/report.model'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  report: Report;
  reportList: any[] = []

  constructor(private reportService: ReportService) { }

  ngOnInit() {

  }

}
