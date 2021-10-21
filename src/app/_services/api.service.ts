import { HttpClient } from '@angular/common/http';
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

  
}
