import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
 HttpEvent,
 HttpInterceptor,
 HttpHandler,
 HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {
 intercept(
  req: HttpRequest<any>,
  next: HttpHandler,
 ): Observable<HttpEvent<any>> {
  let url = req.url;
  if (url.indexOf("/portal/upload/") > 0
     || url.indexOf("/portal/uploadUsersFile/") > 0 || url.indexOf("/portal/uploadCompanyImage/") > 0) {
    const dupReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
   return next.handle(dupReq);
  } else if (url.indexOf("/portal/upload/") < 0){
    const dupReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json'),
    });
   return next.handle(dupReq);
  }

 }
}


@NgModule({
providers: [
 {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpsRequestInterceptor,
  multi: true,
 },
],
})


export class Interceptor {}
