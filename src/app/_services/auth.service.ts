import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  
  
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient)  { }

  login(credentials:any): Observable<any> {
    console.log(credentials.username+"  "+credentials.password+"   "+AUTH_API+"login")
    return this.http.post(AUTH_API + 'login', {
      password: credentials.password,
      username: credentials.username
      
    },{observe: "response"});
  }
}
