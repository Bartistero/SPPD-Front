import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private http: HttpClient) { }

  
}
