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

  getAllCongressmen(name:string,number:string) {
    return this._http.get<any>(this.baseUrl + '/' + number + '/' + name +'/members.json/', this.stdJsonOptions);
  }

  getCongressman(id: string){
    return this._http.get<any>(this.baseUrl + '/members/' + id + '.json', this.stdJsonOptions);

  }
}
