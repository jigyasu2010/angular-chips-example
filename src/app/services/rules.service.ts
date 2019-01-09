import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RulesService {

  private url = "https://api.myjson.com/bins/c6298";
  private saveUrl = "http://dasdasd";

  constructor(private http: HttpClient) { }

  getRules(): Observable<any> {
    return this.http.get(this.url);
  }

  saveRules(payload): Observable<any> {
    return this.http.post(this.saveUrl, payload)
  }

}