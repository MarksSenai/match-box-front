import { UploadFileService } from './../upload/upload-file.service';
import { ReportService } from './../reports/report.service';
import { MachinesService } from './../machines/machines.service';
import { Report } from './../shared/report.model';
import { Machine } from './../machines/machine.model';
import { Users } from './../users/users.model';
import { UsersService } from './../users/users.service';
import { Component, OnInit, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  @Input() usersList : Users[];
  @Input() machinesList : Machine[];
  userIdSelected: number = 0;
  machineIdSelected: number = 0;
  reportFileName: string = "excelfilereport.xlsx";
  reportBlob: any;
  limit: number = 100;
  rec: string =  null;
  initialDate = new Date();
  finalDate = new Date();
   
  constructor(private usersService: UsersService,
     private machineService: MachinesService,
     private reportService: ReportService,
     private uploadFileService: UploadFileService,
     private toastr: ToastrService) { }
 
  setUser(userFilter: any){
    this.userIdSelected = userFilter;
  }

  setMachine(machineFilter: any){
    this.machineIdSelected = machineFilter;
  }

  searchReport(){
      if (this.finalDate < this.initialDate) {
        this.showError("Data final deve ser maior ou igual à data inicial");
      } else {
        if(this.userIdSelected > 0 && this.machineIdSelected == 0) {
          this.reportService.getReportByUser(this.userIdSelected, this.convertDate(this.initialDate),
          this.convertDate(this.finalDate), this.limit)
            .subscribe((reports: Report[]) =>{
              this.reportService.reportUpdateEvent.emit(reports);
        }); 
      
          } else if (this.userIdSelected == 0 && this.machineIdSelected > 0) {
            this.reportService.getReportByMachine(this.machineIdSelected, this.convertDate(this.initialDate),
            this.convertDate(this.finalDate), this.limit)
              .subscribe((reports: Report[]) =>{
              this.reportService.reportUpdateEvent.emit(reports);
            });
    
          } else if (this.userIdSelected > 0 && this.machineIdSelected > 0) {
            this.reportService.getReportByUserAndMachine(this.userIdSelected, this.machineIdSelected, this.convertDate(this.initialDate),
            this.convertDate(this.finalDate), this.limit)
              .subscribe((reports: Report[]) =>{
              this.reportService.reportUpdateEvent.emit(reports);
            });
          } else if (this.userIdSelected == 0 && this.machineIdSelected == 0) {
            this.reportService.getAllReport(this.convertDate(this.initialDate),
            this.convertDate(this.finalDate), this.limit)
              .subscribe((reports: Report[]) => {
    
              this.reportService.reportUpdateEvent.emit(reports);
            });
          }
      }
  }

  private convertDate(date: Date) {
    let month: number = date.getMonth();
    month += 1;
    return date.getFullYear()+"-"+month+"-"+date.getDate();
  }

  generateExcel(){
    if(this.userIdSelected > 0 && this.machineIdSelected == 0) {
      this.reportService.generateExcelByUser(this.userIdSelected, this.convertDate(this.initialDate),
      this.convertDate(this.finalDate), this.limit)
        .subscribe((report: Blob) => {
          this.uploadFileService.getexcelFile(this.reportFileName, this.rec).subscribe((file) => {
            this.dropExcelFile(file);
        });
      });
 
    } else if (this.userIdSelected == 0 && this.machineIdSelected > 0) {
        this.reportService.generateExcelByMachine(this.machineIdSelected, this.convertDate(this.initialDate),
        this.convertDate(this.finalDate), this.limit)
          .subscribe((report: Blob) => {
            this.uploadFileService.getexcelFile(this.reportFileName, this.rec).subscribe((file) => {
              this.dropExcelFile(file);
            });
        });

    } else if (this.userIdSelected > 0 && this.machineIdSelected > 0) {
        this.reportService.generateExcelByUserAndMachine(this.convertDate(this.initialDate),
         this.convertDate(this.finalDate), this.userIdSelected, this.machineIdSelected, this.limit)
          .subscribe((report: Blob) =>{
            this.uploadFileService.getexcelFile(this.reportFileName, this.rec).subscribe((file) => {
              this.dropExcelFile(file);
            });
        });
    } else if (this.userIdSelected == 0 && this.machineIdSelected == 0) {
            this.reportService.generateExcelAll(this.convertDate(this.initialDate),
            this.convertDate(this.finalDate), this.limit)
              .subscribe((report: Blob)=>{
                this.uploadFileService.getexcelFile(this.reportFileName, this.rec).subscribe((file) => {
                  this.dropExcelFile(file);
                });
          });
    }
  }

  private dropExcelFile(file){
    var fileBlob = new Blob([file], {type: 'text/xlsx'});
    var blobReference = URL.createObjectURL(fileBlob);
    var hiddenElement = document.createElement("a");
    document.body.appendChild(hiddenElement);
    hiddenElement.download = "ExcelFileexceldatabase.xlsx";
    hiddenElement.href = blobReference;
    hiddenElement.click();
    hiddenElement.remove();
    URL.revokeObjectURL(blobReference);
  }

  private showError(message) {
    this.toastr.error(message);
  }
  
  ngOnInit() {
    this.usersService.getUsers()
    .subscribe(
      (users: any[]) => {
      this.usersList = users;
    });
    this.machineService.getMachines().subscribe((machines: Machine[]) => {
      this.machinesList = machines;
    })
  }
}