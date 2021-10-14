import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public loginForm: any
  public errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  onSubmit(){
    let credentials = {
      "password": this.loginForm.controls.password.value,
      "username" : this.loginForm.controls.login.value
      
  
  }
  this.authService.login(credentials).subscribe(
    data => {
      console.log(data)
    },
    err => {
      this.errorMessage = err.error.message;
      console.log(this.errorMessage)
     
    }
  );
  }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      login: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    })

  } 
}
