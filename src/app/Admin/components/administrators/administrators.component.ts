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
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { MatAlert } from '@lhn/mat-alert';






@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.css']
})


export class AdministratorsComponent implements OnInit {
  public status : any
  public i = 1
  public isAdmins = true;
  public isAdminForm = false;
  public isAdminEditForm = false;
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
  filteredStreets1: Observable<street[]> | undefined;
  filteredFaculties: Observable<faculty[]> | undefined;
  filteredVoivodeships: Observable<voivodeship[]> | undefined;
  filteredBoroughs: Observable<borough[]> | undefined;
  filteredCounties: Observable<county[]> | undefined;
  filteredCities: Observable<city[]> | undefined;
  
  constructor(private apiService: ApiService,public alert: MatAlert) { }

  adminForm = new FormGroup({
    name: new FormControl('',Validators.required),
    middleName: new FormControl(''),
    surname: new FormControl('',Validators.required),
    login: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
    pesel: new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
    phone: new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
    permission: new FormControl('',Validators.required),
    facultyDto: new FormControl('',Validators.required),
    countryDto: new FormControl('',Validators.required),
    voivodeshipDto: new FormControl('',Validators.required),
    countyDto: new FormControl('',Validators.required),
    boroughDto: new FormControl('',Validators.required),
    cityDto: new FormControl('',Validators.required),
    streetDto: new FormControl(''),
    sex: new FormControl('',Validators.required),
    houseNumber: new FormControl('',Validators.required),
    flatNumber: new FormControl('')

  })

  adminEditForm = new FormGroup({
    id: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    middleName: new FormControl(''),
    surname: new FormControl('',Validators.required),
    login: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
    pesel: new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
    phone: new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
    permission: new FormControl('',Validators.required),
    facultyDto: new FormControl('',Validators.required),
    countryDto: new FormControl('',Validators.required),
    voivodeshipDto: new FormControl('',Validators.required),
    countyDto: new FormControl('',Validators.required),
    boroughDto: new FormControl('',Validators.required),
    cityDto: new FormControl('',Validators.required),
    streetDto: new FormControl(''),
    sex: new FormControl('',Validators.required),
    houseNumber: new FormControl('',Validators.required),
    flatNumber: new FormControl('')

  })



  
  public edit(object: any){
    this.showEditAdmin()
    this.apiService.getCounty(object.voivodeshipDto.id).subscribe(data =>{
      this.counties = data
    })

    this.apiService.getBorough(object.countyDto.id).subscribe(
      data => {
        this.boroughs = data
        }
      )

    this.apiService.getCity(object.boroughDto.id).subscribe(
      data => {
        this.cities = data

      }
    )

    this.apiService.getStreet(object.boroughDto.id).subscribe(
      data => {
        this.streets = data
        console.log(this.streets)

      }
    )

    this.adminEditForm.controls.id.setValue(object.id)
    this.adminEditForm.controls.name.setValue(object.name)
    this.adminEditForm.controls.middleName.setValue(object.middleName)
    this.adminEditForm.controls.surname.setValue(object.surname)
    this.adminEditForm.controls.login.setValue(object.login)
    this.adminEditForm.controls.email.setValue(object.email)
    this.adminEditForm.controls.pesel.setValue(object.pesel)
    this.adminEditForm.controls.phone.setValue(object.phone)
    this.adminEditForm.controls.login.setValue(object.login)
    this.adminEditForm.controls.sex.setValue(object.sex)
    this.adminEditForm.controls.permission.setValue(object.permission)
    this.adminEditForm.controls.facultyDto.setValue(object.facultyDto)
    this.adminEditForm.controls.countryDto.setValue(object.countryDto)
    this.adminEditForm.controls.voivodeshipDto.setValue(object.voivodeshipDto)
    this.adminEditForm.controls.countyDto.setValue(object.countyDto)
    this.adminEditForm.controls.boroughDto.setValue(object.boroughDto)
    this.adminEditForm.controls.cityDto.setValue(object.cityDto)
    this.adminEditForm.controls.streetDto.setValue(object.streetDto)
    this.adminEditForm.controls.houseNumber.setValue(object.houseNumber)
    this.adminEditForm.controls.flatNumber.setValue(object.flatNumber)
    console.log(object)
    
    

  }

  public onSubmitAdminEdit(){
    
      console.log(this.adminEditForm.value)
      this.apiService.editAdmin(this.adminEditForm.value).subscribe(
        data =>{
          if(data.status == 200)
            {
              this.alert.show('Sukces', 'Użytkonik zedytowany', {
                buttonText: 'Ok',
                buttonTheme: 'primary',
                raisedButton: true,
              })
            this.apiService.getAdmin().subscribe(
              data => {
                  this.dataSourceAdmins = data
              }
            )
            }
          
          this.alert.show('Błąd', 'Coś poszło nie tak', {
            buttonText: 'Ok',
            buttonTheme: 'primary',
            raisedButton: true,
          })
        },err=>{
          this.alert.show('Błąd', 'Coś poszło nie tak', {
            buttonText: 'Ok',
            buttonTheme: 'primary',
            raisedButton: true,
          })
        }
      )
      this.adminEditForm.reset()
    

  }

  public delete(object:any){
    if(confirm("Czy na pewno chcesz usunąć administratora "+object.name+" "+object.surname+"?"))
    {
      console.log(object)
      this.apiService.deleteAdmin(object.id).subscribe(
        data => {
          this.alert.show('Sukces', 'Użytkonik usunięty!', {
            buttonText: 'Ok',
            buttonTheme: 'primary',
            raisedButton: true,
          })
        },err=>{
          this.alert.show('Błąd', 'Coś poszło nie tak', {
            buttonText: 'Ok',
            buttonTheme: 'primary',
            raisedButton: true,
          })
        }
      )
      this.apiService.getAdmin().subscribe(
        data => {
            this.dataSourceAdmins = data
        }
      )
    }
    
  }


  public showAdmins() {
    this.isAdmins = true;
    this.isAdminForm = false;
    this.isAdminEditForm = false;
  }

  public showAddNewAdmin() {
    this.isAdmins = false;
    this.isAdminForm = true;
    this.isAdminEditForm = false;
  }

  public showEditAdmin() {
    this.isAdmins = false;
    this.isAdminForm = false;
    this.isAdminEditForm = true;
  }

  
 
  public setLoginAndEmail(){
    let name = (this.adminForm.controls.name.value).toLowerCase()
    let lastName = (this.adminForm.controls.surname.value).toLowerCase()
    let login = name+"."+lastName
    if (name && lastName) {
      this.apiService.isLoginValid(login).subscribe(data => {
        this.adminForm.controls.login.setValue(name + "." + lastName)
        this.adminForm.controls.email.setValue(name + "." + lastName + "@")
        this.status = false
      },
        err => {
          this.status = true
          var login = name + "." + lastName
          this.apiService.isLoginValid(login + this.i.toString()).subscribe(data => {
            this.adminForm.controls.login.setValue(login + this.i.toString())
            this.adminForm.controls.email.setValue(name + "." + lastName + this.i.toString() + "@")
            this.status = false

          }, err => {
            this.i += 1
            console.log(this.i)
          })

        }

      )


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

  public AdminEditStyle()
  {
    var display:string
      if(!this.isAdminEditForm)
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
  clear(){
    
    this.adminEditForm.controls.voivodeshipDto.reset()
    this.adminEditForm.controls.countyDto.reset()
    this.adminEditForm.controls.boroughDto.reset()
    this.adminEditForm.controls.cityDto.reset()
    this.adminEditForm.controls.streetDto.reset()
  }
  clear2(){
    this.adminEditForm.controls.countyDto.reset()
    this.adminEditForm.controls.boroughDto.reset()
    this.adminEditForm.controls.cityDto.reset()
    this.adminEditForm.controls.streetDto.reset()
  }

  clear3(){
    this.adminEditForm.controls.boroughDto.reset()
    this.adminEditForm.controls.cityDto.reset()
    this.adminEditForm.controls.streetDto.reset()
  }

  clear4(){
    this.adminEditForm.controls.cityDto.reset()
    this.adminEditForm.controls.streetDto.reset()
  }

  clear5(){
    this.adminEditForm.controls.streetDto.reset()
  }

  

  public voivodeshipPicked(){
    this.showCounties = true
    
    this.apiService.getCounty(this.adminForm.controls.voivodeshipDto.value.id).subscribe(
      data => {
        this.counties = data
          
        }
      )
  }

  public voivodeshipPicked1(){
    this.showCounties = true
    
    this.apiService.getCounty(this.adminEditForm.controls.voivodeshipDto.value.id).subscribe(
      data => {
        this.counties = data
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

  public countyPicked1(){
    this.showBoroughs = true
    
    this.apiService.getBorough(this.adminEditForm.controls.countyDto.value.id).subscribe(
      data => {
        this.boroughs = data
        }
      )
  }

  public boroughPicked(){
    this.showCities = true
    console.log(this.adminForm.controls.boroughDto.value.id)
    console.log(this.adminForm.controls.countyDto.value.id)
    this.apiService.getCity(this.adminForm.controls.boroughDto.value.id).subscribe(
      data => {
        this.cities = data

        }
      )
  }

  public boroughPicked1(){
    this.showCities = true

    this.apiService.getCity(this.adminEditForm.controls.boroughDto.value.id).subscribe(
      data => {
        this.cities = data

        }
      )
  }

  public cityPicked(){
    this.showStreets = true
    this.apiService.getStreet(this.adminForm.controls.boroughDto.value.id).subscribe(
      data => {
        this.streets = data
        console.log(data)
        }
      )
    
  }

  public cityPicked1(){
    this.showStreets = true
    this.apiService.getStreet(this.adminEditForm.controls.boroughDto.value.id).subscribe(
      data => {
        this.streets = data
        console.log(data)
        }
      )
    
  }

 

  public onSubmitAdmin(){
    console.log(this.adminForm.value)
    this.apiService.addAdmin(this.adminForm.value).subscribe(
      data =>{
        if(data.status == 200)
          {
            alert("Administrator został dodany!")
          this.apiService.getAdmin().subscribe(
            data => {
                this.dataSourceAdmins = data
            }
          )
          }
        else
          alert("Coś poszło nie tak")
      }
    )
    this.adminForm.reset()
    window.location.reload()
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

  _filterFaculty(val: string): faculty[] {
    return this.faculties.filter(option => {
      return option.name.toLowerCase().match(val) 
    });
  }

  _filterVoivodeship(val: string): voivodeship[] {
    return this.voivodeships.filter(option => {
      return option.name.toLowerCase().match(val) 
    });
  }

  _filterCounty(val: string): county[] {
    return this.counties.filter(option => {
      return option.name.toLowerCase().match(val) 
    });
  }

  _filterBorough(val: string): borough[] {
    return this.boroughs.filter(option => {
      return option.name.toLowerCase().match(val) 
    });
  }

  _filterCity(val: string): city[] {
    return this.cities.filter(option => {
      return option.name.toLowerCase().match(val) 
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

    this.filteredCountries = this.adminForm.controls['countryDto'].valueChanges.pipe(
      startWith(''), 
      map(country =>  country ? this._filter(country) : this.countries.slice())
      );

    this.filteredStreets = this.adminForm.controls['streetDto'].valueChanges.pipe(
        startWith(''), 
        map(street =>  street ? this._filterStreet(street) : this.streets.slice())
        );
    
    this.filteredVoivodeships = this.adminEditForm.controls['voivodeshipDto'].valueChanges.pipe(
        startWith(''), 
        map(voivodeship =>  voivodeship ? this._filterVoivodeship(voivodeship) : this.voivodeships.slice())
          );

    


    this.filteredFaculties = this.adminEditForm.controls['facultyDto'].valueChanges.pipe(
      startWith(''),
      map(faculty => faculty ? this._filterFaculty(faculty) : this.faculties.slice())
    );

    this.filteredBoroughs = this.adminEditForm.controls['boroughDto'].valueChanges.pipe(
      startWith(''),
      map(borough => borough ? this._filterBorough(borough) : this.boroughs.slice())
    );
    this.filteredCounties = this.adminEditForm.controls['countyDto'].valueChanges.pipe(
      startWith(''),
      map(county => county ? this._filterCounty(county) : this.counties.slice())
    );
    this.filteredCities = this.adminEditForm.controls['cityDto'].valueChanges.pipe(
      startWith(''),
      map(city => city ? this._filterCity(city) : this.cities.slice())
    );

    this.filteredStreets1 = this.adminEditForm.controls['streetDto'].valueChanges.pipe(
      startWith(''),
      map(street => street ? this._filterStreet(street) : this.streets.slice())
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
