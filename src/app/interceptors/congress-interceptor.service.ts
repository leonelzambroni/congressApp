import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CongressInterceptorService implements HttpInterceptor {

  constructor() { }



  intercept(req: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
      'X-API-Key': '3AaiZHfaoIZXiwZnZrliAcJpKPwLPLMrpEcCIgBM',
      'Content-Type': 'application/json; charset=utf-8',
    });


    const reqClone = req.clone({
      headers
    });

    console.log('intercepted: ' + (reqClone.urlWithParams + ' ' + reqClone.headers));

    return next.handle(reqClone).pipe(
      tap(
        event => {
          console.log('Intercepted! response', event);
        }),
        catchError(this.errorHandler)
      
    )}  


  errorHandler(error: HttpErrorResponse) {

    console.log('There was an error');
    console.warn(error);
    return throwError('');

  }

  successHandler(evt: HttpResponse<any>) {

  }

}
