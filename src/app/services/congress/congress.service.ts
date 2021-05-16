import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CongressService {


  headers = new HttpHeaders({
    'X-API-Key': '3AaiZHfaoIZXiwZnZrliAcJpKPwLPLMrpEcCIgBM',
    'Content-Type': 'application/json; charset=utf-8',
  });

  stdJsonOptions = {
    headers: this.headers
  };

  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  getAllCongressmen() {
    return this._http.get<any>(this.baseUrl + '/116/senate/members.json/', this.stdJsonOptions);
  }

  getCongressmen(){
    
  }
}
