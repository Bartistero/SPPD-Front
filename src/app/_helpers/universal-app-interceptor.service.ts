import { HttpRequest, HttpHandler, HttpInterceptor} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UniversalAppInterceptorService implements HttpInterceptor{
  constructor( private api: ApiService,private tokenStorage: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.tokenStorage.getToken()
    console.log(token)
    req = req.clone({
      url:  req.url,
      setHeaders: {
        Authorization: `${token}`
      }
    });
    return next.handle(req);
  }
 
}

