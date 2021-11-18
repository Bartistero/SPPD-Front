import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from './cookie.service';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { MatAlert } from '@lhn/mat-alert';

const AUTH_API = 'http://localhost:8080/api/';
//const AUTH_API = 'https://sppd-server.herokuapp.com/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  
  
};


@Injectable({
  providedIn: 'root'
  
})
export class AuthService {
  
  

  constructor(private http: HttpClient,private cookieService: CookieService,
    private localStorage: LocalStorageService, private router: Router,private alert:MatAlert)  { }

  login(credentials:any): Observable<any> {
    
    console.log(credentials.username+"  "+credentials.password+"   "+AUTH_API+"login")
    return this.http.post(AUTH_API + 'login', {
      password: credentials.password,
      username: credentials.username
      
    },{observe: "response"});
  }
  activate(credentials:any,token:any): Observable<any> {
    
    return this.http.post(AUTH_API + 'login/activate/'+token, {
      password: credentials.password,
      username: credentials.username
      
    },{observe: "response"});
  }

  checkStatus(login:string):Observable<any>{
    let param = new HttpParams()
    param= param.set('login',login)
    return this.http.get(AUTH_API+"login/account-status",{params:param,observe:"response"})
    
  }

  logout(){
   
    this.localStorage.remove('Token')
    this.localStorage.remove('Login')
    this.router.navigate(['login'])
    
  }


  }