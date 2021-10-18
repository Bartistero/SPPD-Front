import { Injectable } from '@angular/core';
import  jwt_decode from 'jwt-decode';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  
  jwtToken: any;
  decodedToken: any;

   

    setToken(token: string) {
      if (token) {
        this.jwtToken = token;
      }
      
    }
    getToken(){
      return this.jwtToken
    }

    decodeToken() {
      if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
      }
    }

    getDecodeToken() {
      return jwt_decode(this.jwtToken);
    }


    getUser() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.sub : null;
    }

    getPermission() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.permission : null;
    }

    getExpiryTime() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.exp : null;
    }

    isTokenExpired(): boolean {
      const expiryTime: number = this.getExpiryTime();
      if (expiryTime) {
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }
    }

 
}
