import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { voivodeship } from 'src/app/shared/models/voivodeship';
import { county } from 'src/app/shared/models/county';
import { borough } from 'src/app/shared/models/borough';
import { city } from 'src/app/shared/models/city';
import { street } from 'src/app/shared/models/streets';
import { country } from 'src/app/shared/models/country';
import { faculty } from 'src/app/shared/models/faculty';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditAdminDialogComponent } from '../edit-admin-dialog/edit-admin-dialog.component';






@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.css']
})


export class AdministratorsComponent implements OnInit {
  public isAdmins = true;
  public isAdminForm = false;
  public faculties: faculty[] = []
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
    "ADMIN"
  ]
  displayedColAdmin: string[] = [ 'id', 'name','surname','permission','faculty','edit','delete']
  dataSourceAdmins:any
  filteredCountries: Observable<country[]> | undefined;
  filteredStreets: Observable<street[]> | undefined;
  
  constructor(private apiService: ApiService,public dialog: MatDialog) { }

  adminForm = new FormGroup({
    name: new FormControl('',Validators.required),
    middleName: new FormControl(''),
    surname: new FormControl('',Validators.required),
    login: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
    pesel: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    permission: new FormControl('',Validators.required),
    facultyDto: new FormControl('',Validators.required),
    countryDto: new FormControl('',Validators.required),
    voivodeshipDto: new FormControl('',Validators.required),
    countyDto: new FormControl('',Validators.required),
    boroughDto: new FormControl('',Validators.required),
    cityDto: new FormControl('',Validators.required),
    streetDto: new FormControl('',Validators.required),
    sex: new FormControl('',Validators.required),
    houseNumber: new FormControl('',Validators.required),
    flatNumber: new FormControl('')

  })

  
  public edit(object: any){
    this.dialog.open(EditAdminDialogComponent,{data: {object}})
  }

  public delete(object:any){
    if(confirm("Czy na pewno chcesz usunąć administratora "+object.name+" "+object.surname+"?"))
    {
      console.log(object)
      this.apiService.deleteAdmin(object).subscribe(
        data => {
          console.log(data.status)
        }
      )
    }
  }


  public showAdmins() {
    this.isAdmins = true;
    this.isAdminForm = false;
  }

  public showAddNewAdmin() {
    this.isAdmins = false;
    this.isAdminForm = true;
    
  }

  
 
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

  public adminsStyle()
  {
    
    var display:string
    if(!this.isAdmins)
       display = 'none'
    else
      display = 'block'

   return display
  }

  public newAdminStyle()
  {
    var display:string
      if(!this.isAdminForm)
         display = 'none'
      else
        display = 'block'

     return display
  }


  public nameChange(){
    this.setLoginAndEmail()
  }

  public lastNameChange(){
    this.setLoginAndEmail()
  }

  public voivodeshipPicked(){
    this.showCounties = true
    
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
    this.showBoroughs = true
    
    
    this.apiService.getBorough(this.adminForm.controls.countyDto.value.id).subscribe(
      data => {
        this.boroughs = data
          
          
        }
      )

    
  }

  public boroughPicked(){
    this.showCities = true
    
    
    this.apiService.getCity(this.adminForm.controls.boroughDto.value.id).subscribe(
      data => {
        this.cities = data
          console.log(this.cities)
          
        }
      )

    
  }

  public cityPicked(){
    this.showStreets = true
    this.apiService.getStreet(this.adminForm.controls.boroughDto.value.id).subscribe(
      data => {
        this.streets = data
         
          
        }
      )
    
  }

 

  public onSubmitAdmin(){
    console.log(this.adminForm.value)
    this.apiService.addAdmin(this.adminForm.value).subscribe(
      data =>{
        if(data.status == 200)
          alert("Administrator został dodany!")
        else
          alert("Coś poszło nie tak")
      }
    )
    this.adminForm.reset()
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
    return object ? object.firstPart : undefined
  }

  ngOnInit(): void {

    this.filteredCountries = this.adminForm.controls['countryDto'].valueChanges.pipe(
      startWith(''), 
      map(country =>  country ? this._filter(country) : this.countries.slice())
      );

    this.filteredStreets = this.adminForm.controls['streetDto'].valueChanges.pipe(
        startWith(''), 
        map(street =>  street ? this._filterStreet(street) : this.streets.slice())
        );
    

    
    
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

      this.apiService.getFaculty().subscribe(
        data => {
          this.faculties = data
          }
        )


      this.apiService.getAdmin().subscribe(
        data => {
            this.dataSourceAdmins = data
        }
      )
      
  }


}
