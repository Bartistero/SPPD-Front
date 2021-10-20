import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { CookieService } from '../_services/cookie.service';
import { LocalStorageService } from '../_services/local-storage.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(private loginService: AuthService,
              private authStorageService: LocalStorageService,
              private jwtService: TokenStorageService,
              private router: Router,
              private cookieService: CookieService,
              private localStorage: LocalStorageService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.cookieService.get('Token')) {
        console.log(this.jwtService.isTokenExpired())
        this.router.navigate(['/login']);
        return false;
      }else 
      { this.jwtService.setToken(this.cookieService.get('Token')) 
        if(next.data.permission && next.data.permission.includes(this.jwtService.getPermission()))
          return true;
        else {
          if(this.jwtService.getPermission() == "SUPER_ADMIN")
            this.router.navigate(['admin'])
          else if(this.jwtService.getPermission() == "ADMIN")
            this.router.navigate(['adminUnit'])
          else if(this.jwtService.getPermission() == "LECTURER")
            this.router.navigate(['supervisor'])
          else
            this.router.navigate(['candidate'])

          return false
        }
      }
}
}
