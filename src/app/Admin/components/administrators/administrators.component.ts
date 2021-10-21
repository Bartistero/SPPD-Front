import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { voivodeship } from 'src/app/shared/models/voivodeship';
import { county } from 'src/app/shared/models/county';
import { borough } from 'src/app/shared/models/borough';
import { city } from 'src/app/shared/models/city';
import { street } from 'src/app/shared/models/streets';





@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.css']
})


export class AdministratorsComponent implements OnInit {
  public voivodeships: voivodeship[]= []
  public counties: county[]= []
  public boroughs: borough[]= []
  public cities: city[]= []
  public streets: street[]= []
  public showCounties = false
  public showBoroughs = false
  public showCities = false
  public showStreets = false
  
  constructor(private apiService: ApiService) { }

  adminForm = new FormGroup({
    adminName: new FormControl('',Validators.required),
    voivodeship: new FormControl(''),
    county: new FormControl(''),
    borough: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl('')

  })

 

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
  }

}
