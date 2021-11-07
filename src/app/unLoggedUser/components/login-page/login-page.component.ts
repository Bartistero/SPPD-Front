import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatAlert } from '@lhn/mat-alert';
import { AuthService } from 'src/app/_services/auth.service';
import { CookieService } from 'src/app/_services/cookie.service';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  
})
export class LoginPageComponent implements OnInit {
  public loginForm: any
  public errorMessage = '';
  public data: any
  public error = ""

  constructor(private alert: MatAlert,private localStorage: LocalStorageService,private authService: AuthService, private tokenStorage: TokenStorageService,private cookieService: CookieService,private router: Router) { }

  onSubmit(){
    let credentials = {
      "password": this.loginForm.controls.password.value,
      "username" : this.loginForm.controls.login.value
  }

  this.authService.login(credentials).subscribe(
    data => {
      console.log(this.tokenStorage.setToken(data.headers.get('Authorization')))
      if(data.headers.get('Authorization')){
        this.localStorage.set('Login',this.tokenStorage.getUser())
        this.localStorage.set('Token',data.headers.get('Authorization'))
        this.cookieService.set('Token',data.headers.get('Authorization'))
        
      }
      
      
      if(this.tokenStorage.getPermission() == "SUPER_ADMIN")
        this.router.navigate(['admin'])
      else if(this.tokenStorage.getPermission() == "ADMIN")
        this.router.navigate(['adminUnit'])
      else if(this.tokenStorage.getPermission() == "LECTURER")
        this.router.navigate(['supervisor'])
      else  
        this.router.navigate(['candidate'])

        

     
      
    },
    err => {
      /*this.errorMessage = err.error.message;
      console.log(this.errorMessage)
     */
      this.error = "Błąd logowania"
    
    }
  );

  console.log(this.data)
  }

  ngOnInit(): void {
/*
    this.alert.show('Message title', 'Message content (<em>supports HMTL</em>)', {
      buttonText: 'Great!',
      buttonTheme: 'primary',
      raisedButton: true,
      
      
    });
*/
    this.loginForm= new FormGroup({
      login: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    })

  } 
}
