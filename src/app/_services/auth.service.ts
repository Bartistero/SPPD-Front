import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from './cookie.service';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

const AUTH_API = 'http://localhost:8080/';
//const AUTH_API = 'https://sppd-server.herokuapp.com/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  
  
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  

  constructor(private http: HttpClient,private cookieService: CookieService,
    private localStorage: LocalStorageService, private router: Router)  { }

  login(credentials:any): Observable<any> {
    console.log(credentials.username+"  "+credentials.password+"   "+AUTH_API+"login")
    return this.http.post(AUTH_API + 'login', {
      password: credentials.password,
      username: credentials.username
      
    },{observe: "response"});
  }

  logout(){
    this.cookieService.remove('Token')
    this.localStorage.remove('Token')
    this.localStorage.remove('Login')
    this.router.navigate(['/login'])


  }
}
