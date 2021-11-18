import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root',
  
})
export class ApiService {
  

  constructor(private http: HttpClient) { }
  getVoivodeship(): Observable<any>{
    return this.http.get(API_URL+'address/voivodeship')

  }

  getCountry(): Observable<any>{
    return this.http.get(API_URL+'address/country')

  }

  getCounty(id: number): Observable<any>{
    return this.http.get(API_URL+'address/count/'+id)

  }

  getBorough(id: number): Observable<any>{
    return this.http.get(API_URL+'address/borough/'+id)

  }

  getCity(id: number): Observable<any>{
    return this.http.get(API_URL+'address/city/'+id)

  }

  getStreet(id: number): Observable<any>{
    return this.http.get(API_URL+'address/street/'+id)

  }

  isLoginValid(login:string){
    return this.http.get(API_URL+'login/check/'+login,{observe: "response"})

  }

  getFaculty(): Observable<any>{
    return this.http.get(API_URL+'faculty')
  }

  addFaculty(faculty: any): Observable<any>{
    return this.http.post(API_URL+'faculty',faculty,{observe: "response"})
  }

  
  editFaculty(faculty: any): Observable<any>{
    return this.http.post(API_URL+'faculty/update',faculty,{observe: "response"})
  }

  addAdmin(admin: any): Observable<any>{
    return this.http.post(API_URL+'admin',admin,{observe: "response"})
  }

  editAdmin(admin: any): Observable<any>{
    return this.http.post(API_URL+'admin/put',admin,{observe: "response"})
  }

  getAdmin(): Observable<any>{
    let param = new HttpParams();
    param = param.set('page', 0);
    param = param.set('pageSize', 100);
    return this.http.get(API_URL+'admin',{params: param})
  }

  deleteAdmin(id: number): Observable<any>{
    let param = new HttpParams();
    param = param.set('id',id)
    return this.http.get(API_URL+'admin/delete',{params: param})
  }



  getCourse(): Observable<any>{
    return this.http.get(API_URL+'degree-course')
  }

  addCourse(course: any): Observable<any>{
    return this.http.post(API_URL+'degree-course',course,{observe: "response"})
  }

  
  editCourse(course: any): Observable<any>{
    return this.http.post(API_URL+'degree-course/update',course,{observe: "response"})
  }



  deleteUser(id: number): Observable<any>{
    let param = new HttpParams();
    param = param.set('id',id)
    return this.http.get(API_URL+'user/delete',{params: param})
  }

  getUser(permission: string): Observable<any>{
    let param = new HttpParams();
    param = param.set('permission', permission);
    
    return this.http.get(API_URL+'user',{params: param})
  }

  addUser(user: any): Observable<any>{
    return this.http.post(API_URL+'user',user,{observe: "response"})
  }


  getBlockedAccounts(){
    return this.http.get(API_URL+"login/block-user")
  }
  

  
}
