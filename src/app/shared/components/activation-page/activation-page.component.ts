import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective,  ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {ActivatedRoute,ParamMap} from '@angular/router';
import { MatAlert } from '@lhn/mat-alert';
import { AuthService } from 'src/app/_services/auth.service';
import { MyErrorStateMatcher } from './errorMatcher';

@Component({
  selector: 'app-activation-page',
  templateUrl: './activation-page.component.html',
  styleUrls: ['./activation-page.component.css']
})
export class ActivationPageComponent implements OnInit {
  public activationForm: any
  public status= false
  public urlParams: any = {}
  matcher = new MyErrorStateMatcher();
  constructor(private alert: MatAlert,private route: ActivatedRoute, private auth: AuthService) { }

 public onSubmitActivate(){
  let credentials = {
    "password": this.activationForm.controls.password.value,
    "username" : this.urlParams.username
}
   this.auth.activate(credentials,this.urlParams.token).subscribe(data =>{
     this.status = !this.status
    this.alert.show('Sukces', '<h2>Aktywacja konta przebiegła pomyslnie</h2>', {
      buttonText: 'Ok',
      buttonTheme: 'primary',
      raisedButton: true,
    });
   },err=>{
    this.alert.show('Bład', '<h2>Błąd podczas próby aktywacji</h2>', {
      buttonText: 'Ok',
      buttonTheme: 'primary',
      raisedButton: true,
    });
   })


  }
 

  public passwordChange(){

  }


  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    return pass === confirmPass ? null : { notSame: true }
  }



  ngOnInit(): void {
    this.activationForm = new FormGroup({
      password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
      confirmPassword: new FormControl('',[Validators.required,]),
    }, { validators: this.checkPasswords })

    this.urlParams.token = this.route.snapshot.queryParamMap.get('token')
    this.urlParams.username = this.route.snapshot.queryParamMap.get('username')
   

    this.activationForm .controls.password.valueChanges.subscribe(() => {
      this.activationForm .controls.confirmPassword.updateValueAndValidity();
    });
  }

}

