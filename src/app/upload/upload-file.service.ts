import { Injectable, EventEmitter} from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from './../app.component';



@Injectable()
export class UploadFileService {

  private token: any;
  imageEvent = new EventEmitter<string>();

  constructor(private httpClient: HttpClient) {
  }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);
    const req = new HttpRequest(AppComponent.path, '/upload', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.httpClient.request(req);
  }

   storeImage(){

   }

   getexcelFile(excelFileName, rec): Observable<Blob> {
    return this.httpClient.get(AppComponent.path+'/downloadFile/'+excelFileName+"/"+rec,
     { responseType: 'blob' });
    
  }
}