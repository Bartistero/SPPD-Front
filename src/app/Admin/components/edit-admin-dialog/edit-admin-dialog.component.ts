import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { borough } from 'src/app/shared/models/borough';
import { city } from 'src/app/shared/models/city';
import { country } from 'src/app/shared/models/country';
import { county } from 'src/app/shared/models/county';
import { faculty } from 'src/app/shared/models/faculty';
import { street } from 'src/app/shared/models/streets';
import { voivodeship } from 'src/app/shared/models/voivodeship';
import { ApiService } from 'src/app/_services/api.service';
import {map, startWith} from 'rxjs/operators';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


@Component({
  selector: 'app-edit-admin-dialog',
  templateUrl: './edit-admin-dialog.component.html',
  styleUrls: ['./edit-admin-dialog.component.css']
})
export class EditAdminDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private apiService:ApiService) {}
  public status = this.data.object.facultyDto
  public faculties: faculty[] = []
  public countries: country[] = []
  public voivodeships: voivodeship[]= []
  public counties: county[]= []
  public boroughs: borough[]= []
  public cities: city[]= []
  public streets: street[]= []
  public showCounties = true
  public showBoroughs = true
  public showCities = true
  public showStreets = true
  public disableMessage = true
  public  permissions = [
    "ADMIN"
  ]
  filteredCountries: Observable<country[]> | undefined;
  filteredStreets: Observable<street[]> | undefined;


  
  adminForm = new FormGroup({
    name: new FormControl(this.data.object.name,Validators.required),
    middleName: new FormControl(this.data.object.middleName),
    surname: new FormControl(this.data.object.surname,Validators.required),
    login: new FormControl(this.data.object.login,Validators.required),
    email: new FormControl(this.data.object.email,Validators.email),
    pesel: new FormControl(this.data.object.pesel,Validators.required),
    phone: new FormControl(this.data.object.phone,Validators.required),
    permission: new FormControl(this.data.object.permission,Validators.required),
    facultyDto: new FormControl(this.data.object.facultyDto,Validators.required),
    countryDto: new FormControl(this.data.object.countryDto,Validators.required),
    voivodeshipDto: new FormControl(this.data.object.voivodeshipDto,Validators.required),
    countyDto: new FormControl(this.data.object.name.countyDto,Validators.required),
    boroughDto: new FormControl(this.data.object.boroughDto,Validators.required),
    cityDto: new FormControl(this.data.object.cityDto,Validators.required),
    streetDto: new FormControl(this.data.object.streetDto,Validators.required),
    sex: new FormControl(this.data.object.sex,Validators.required),
    houseNumber: new FormControl(this.data.object.houseNumber,Validators.required),
    flatNumber: new FormControl(this.data.object.flatNumber)

  })

  public setLoginAndEmail(){
    let name = (this.adminForm.controls.name.value).toLowerCase()
    let lastName = (this.adminForm.controls.surname.value).toLowerCase()
    if(name && lastName)
    {
      this.adminForm.controls.login.setValue(name+"."+lastName)
      this.isLoginValid()
      this.adminForm.controls.email.setValue(name+"."+lastName+"@")
    }
    
  }

  
  public nameChange(){
    this.setLoginAndEmail()
  }

  public lastNameChange(){
    this.setLoginAndEmail()
  }

  public voivodeshipPicked(){
    //this.showCounties = true
    
    this.apiService.getCounty(this.adminForm.controls.voivodeshipDto.value.id).subscribe(
      data => {
        this.counties = data
          console.log(this.voivodeships)
          
        }
      )

  }

  public isLoginValid(){
    
    this.apiService.isLoginValid(this.adminForm.controls.login.value).subscribe(
      data => {
          console.log(data.status)
          
        }
      )
  }

  public countyPicked(){
   // this.showBoroughs = true
    
    
    this.apiService.getBorough(this.adminForm.controls.countyDto.value.id).subscribe(
      data => {
        this.boroughs = data
          
          
        }
      )

    
  }

  public boroughPicked(){
   // this.showCities = true
    
    
    this.apiService.getCity(this.adminForm.controls.boroughDto.value.id).subscribe(
      data => {
        this.cities = data
          console.log(this.cities)
          
        }
      )

    
  }

  public cityPicked(){
   // this.showStreets = true
    this.apiService.getStreet(this.adminForm.controls.boroughDto.value.id).subscribe(
      data => {
        this.streets = data
         
          
        }
      )
    
  }


  
  _filter(val: string): country[] {
    return this.countries.filter(option => {
      return option.name.toLowerCase().match(val);
    });
  }

  _filterStreet(val: string): street[] {
    return this.streets.filter(option => {
      return option.firstPart.toLowerCase().match(val) || option.secondPart.toLowerCase().match(val)
      || option.characteristic.toLowerCase().match(val)
    });
  }


  displayFn(object: any){
    return object ? object.name : undefined
  }

  displayFnStreet(object: any){
    if(object)
      return object.characteristic+" "+object.secondPart+" "+object.firstPart
    else
      return ""
  }


  ngOnInit(): void {
    this.faculties.push(this.data.object.facultyDto)
    this.adminForm.controls.facultyDto.patchValue('facultyDto',this.data.object.facultyDto)

    
    
    
    

    this.apiService.getFaculty().subscribe(
      data => {
        this.faculties = data
        
        
        }
      )

    this.apiService.getVoivodeship().subscribe(
      data => {
        this.voivodeships = data
         
        }
      )
  
    this.apiService.getCountry().subscribe(
        data => {
          this.countries = data
          
    
          }
    )

    
    
  
    this.filteredCountries = this.adminForm.controls['countryDto'].valueChanges.pipe(
      startWith(''), 
      map(country =>  country ? this._filter(country) : this.countries.slice())
      );

    this.filteredStreets = this.adminForm.controls['streetDto'].valueChanges.pipe(
        startWith(''), 
        map(street =>  street ? this._filterStreet(street) : this.streets.slice())
        );
    
  }

}
