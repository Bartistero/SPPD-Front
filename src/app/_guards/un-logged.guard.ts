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
export class UnLoggedGuard implements CanActivate {
  constructor(private loginService: AuthService,
    private authStorageService: LocalStorageService,
    private jwtService: TokenStorageService,
    private route: Router,
    private cookieService: CookieService) {
}
canActivate(
next: ActivatedRouteSnapshot,
state: RouterStateSnapshot): boolean {
  if(this.cookieService.get('Token'))
  {
    {
      this.jwtService.setToken(this.cookieService.get('Token'))
      if(this.jwtService.getPermission() == "SUPER_ADMIN")
        this.route.navigate(['admin/departments'])
       
      else if(this.jwtService.getPermission() == "ADMIN")
        this.route.navigate(['adminUnit/users'])
      else if(this.jwtService.getPermission() == "LECTURER")
        this.route.navigate(['supervisor/approvedTheses'])
      else
        this.route.navigate(['candidate/approvedTheses'])

      return false

    }
  }
    
  else
  {
    
    return true
  }
    
}
  
}
