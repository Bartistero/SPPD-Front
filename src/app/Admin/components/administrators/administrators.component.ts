import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { voivodeship } from 'src/app/shared/models/voivodeship';
import { county } from 'src/app/shared/models/county';
import { borough } from 'src/app/shared/models/borough';
import { city } from 'src/app/shared/models/city';
import { street } from 'src/app/shared/models/streets';
import { country } from 'src/app/shared/models/country';





@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.css']
})


export class AdministratorsComponent implements OnInit {
  public countries: country[] = []
  public voivodeships: voivodeship[]= []
  public counties: county[]= []
  public boroughs: borough[]= []
  public cities: city[]= []
  public streets: street[]= []
  public showCounties = false
  public showBoroughs = false
  public showCities = false
  public showStreets = false
  public disableMessage = true
  public  permissions = [
    {"id":1, "name":"Administrator glówny","value":"SUPER_ADMIN"},
    {"id":2, "name":"Administrator jednostki","value":"ADMIN"}
  ]
  
  constructor(private apiService: ApiService) { }

  adminForm = new FormGroup({
    name: new FormControl('',Validators.required),
    middleName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    login: new FormControl(''),
    email: new FormControl(''),
    pesel: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    permission: new FormControl('',Validators.required),
    country: new FormControl(''),
    voivodeship: new FormControl(''),
    county: new FormControl(''),
    borough: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl('')

  })

 

  public setLoginAndEmail(){
    let name = (this.adminForm.controls.name.value).toLowerCase()
    let lastName = (this.adminForm.controls.lastName.value).toLowerCase()
    if(name && lastName)
    {
      this.adminForm.controls.login.setValue(name+"."+lastName)
      this.adminForm.controls.email.setValue(name+"."+lastName+"@pollub.pl")
    }
    
  }

  public nameChange(){
    this.setLoginAndEmail()
  }

  public lastNameChange(){
    this.setLoginAndEmail()
  }

  public voivodeshipPicked(){
    this.showCounties = true
    
    this.apiService.getCounty(this.adminForm.controls.voivodeship.value.id).subscribe(
      data => {
        this.counties = data
          console.log(this.voivodeships)
          
        }
      )

    
  }

  public countyPicked(){
    this.showBoroughs = true
    console.log(this.adminForm.controls.county.value.id)
    
    this.apiService.getBorough(this.adminForm.controls.county.value.id).subscribe(
      data => {
        this.boroughs = data
          console.log(this.boroughs)
          
        }
      )

    
  }

  public boroughPicked(){
    this.showCities = true
    console.log(this.adminForm.controls.borough.value.id)
    
    this.apiService.getCity(this.adminForm.controls.borough.value.id).subscribe(
      data => {
        this.cities = data
          console.log(this.cities)
          
        }
      )

    
  }

  public cityPicked(){
    this.showStreets = true
    this.apiService.getStreet(this.adminForm.controls.borough.value.id).subscribe(
      data => {
        this.streets = data
          console.log(this.streets)
          
        }
      )
    
  }

  public streetPicked(){
      
    
  }


  ngOnInit(): void {
    
    
    this.apiService.getVoivodeship().subscribe(
    data => {
      this.voivodeships = data
        console.log(this.voivodeships)
        
      }
    )

    this.apiService.getCountry().subscribe(
      data => {
        this.countries = data
          console.log(this.countries)
          
        }
      )


  }

}
