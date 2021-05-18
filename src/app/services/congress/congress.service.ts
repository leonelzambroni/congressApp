import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CongressService {


  

  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  getAllCongressmen(name:string,number:string) {
    return this._http.get<any>(this.baseUrl + '/' + number + '/' + name +'/members.json/',);
  }

  getCongressman(id: string){
    return this._http.get<any>(this.baseUrl + '/members/' + id + '.json',);

  }
}
