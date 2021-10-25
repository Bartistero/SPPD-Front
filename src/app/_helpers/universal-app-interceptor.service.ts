import { HttpRequest, HttpHandler, HttpInterceptor} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UniversalAppInterceptorService implements HttpInterceptor{
  constructor(private loginService: AuthService, private api: ApiService,private tokenStorage: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const re = /login/gi;
    const re2 = /check/gi;
    const token = this.tokenStorage.getToken()
    
    if(this.tokenStorage.isTokenExpired())
      this.loginService.logout()
    
    if (req.url.search(re) === -1 ){
      req = req.clone({
        url:  req.url,
        setHeaders: {
          Authorization: `${token}`
        }
      });
      
      return next.handle(req);
  }else
  {
      if (req.url.search(re2) !== -1 ){
      req = req.clone({
        url:  req.url,
        setHeaders: {
          Authorization: `${token}`
        }
      });
    }
      return next.handle(req);
  }
      
  
  }
 
}

