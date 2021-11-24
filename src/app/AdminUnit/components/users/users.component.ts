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
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public status: any
  public i = 1
  public isUsers = true;
  public isUserForm = false;
  public isUserEditForm = false;
  public faculties: faculty[] = []
  public countries: country[] = []
  public voivodeships: voivodeship[] = []
  public counties: county[] = []
  public boroughs: borough[] = []
  public cities: city[] = []
  public streets: street[] = []
  public showCounties = false
  public showBoroughs = false
  public showCities = false
  public showStreets = false
  public disableMessage = true
  public permissions = ["Promotor", "Dyplomant"]
  public albumStatus = false


  displayedColSupervisor: string[] = ['id', 'name', 'surname', 'edit']
  displayedColCandidate: string[] = ['id', 'name', 'surname', 'edit']
  dataSourceSupervisor: any
  dataSourceCandidate: any
  filteredCountries: Observable<country[]> | undefined;
  filteredStreets: Observable<street[]> | undefined;
  filteredStreets1: Observable<street[]> | undefined;
  filteredFaculties: Observable<faculty[]> | undefined;
  filteredVoivodeships: Observable<voivodeship[]> | undefined;
  filteredBoroughs: Observable<borough[]> | undefined;
  filteredCounties: Observable<county[]> | undefined;
  filteredCities: Observable<city[]> | undefined;

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    surname: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    pesel: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    permission: new FormControl('', Validators.required),
    albumNumber: new FormControl('', Validators.required),
    countryDto: new FormControl('', Validators.required),
    voivodeshipDto: new FormControl('', Validators.required),
    countyDto: new FormControl('', Validators.required),
    boroughDto: new FormControl('', Validators.required),
    cityDto: new FormControl('', Validators.required),
    streetDto: new FormControl(''),
    sex: new FormControl('', Validators.required),
    houseNumber: new FormControl('', Validators.required),
    flatNumber: new FormControl('')

  })

  userEditForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    surname: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    pesel: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    permission: new FormControl('', Validators.required),
    albumNumber: new FormControl('', Validators.required),
    countryDto: new FormControl('', Validators.required),
    voivodeshipDto: new FormControl('', Validators.required),
    countyDto: new FormControl('', Validators.required),
    boroughDto: new FormControl('', Validators.required),
    cityDto: new FormControl('', Validators.required),
    streetDto: new FormControl(''),
    sex: new FormControl('', Validators.required),
    houseNumber: new FormControl('', Validators.required),
    flatNumber: new FormControl('')

  })



  public permissionPicked() {
    if (this.userForm.controls.permission.value == "Promotor")
      this.userForm.controls.albumNumber.disable()
    else
      this.userForm.controls.albumNumber.enable()

  }

  public EditPermissionPicked() {
    if (this.userEditForm.controls.permission.value == "Promotor")
      this.userEditForm.controls.albumNumber.disable()
    else
      this.userEditForm.controls.albumNumber.enable()
  }

  public edit(object: any) {
    
    console.log(object)
    this.apiService.getCounty(object.voivodeshipDto.id).subscribe(data => {
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

    this.userEditForm.controls.id.setValue(object.id)
    this.userEditForm.controls.name.setValue(object.name)
    this.userEditForm.controls.middleName.setValue(object.middleName)
    this.userEditForm.controls.surname.setValue(object.surname)
    this.userEditForm.controls.login.setValue(object.login)
    this.userEditForm.controls.email.setValue(object.email)
    this.userEditForm.controls.pesel.setValue(object.pesel)
    this.userEditForm.controls.phone.setValue(object.phone)
    this.userEditForm.controls.login.setValue(object.login)
    this.userEditForm.controls.sex.setValue(object.sex)
    this.userEditForm.controls.permission.setValue(this.translatePermission(object.permission))
    this.userEditForm.controls.countryDto.setValue(object.countryDto)
    this.userEditForm.controls.voivodeshipDto.setValue(object.voivodeshipDto)
    this.userEditForm.controls.countyDto.setValue(object.countyDto)
    this.userEditForm.controls.boroughDto.setValue(object.boroughDto)
    this.userEditForm.controls.cityDto.setValue(object.cityDto)
    this.userEditForm.controls.streetDto.setValue(object.streetDto)
    this.userEditForm.controls.houseNumber.setValue(object.houseNumber)
    this.userEditForm.controls.flatNumber.setValue(object.flatNumber)


    if (object.permission == "STUDENT")
      this.userEditForm.controls.albumNumber.setValue(object.albumNumber)
    else
      this.userEditForm.controls.albumNumber.disable()

      
    
    this.userEditForm.controls.login.disable()
    this.userEditForm.controls.email.disable()

    this.showEditUser()



  }

  

  

  public delete(object: any) {
    if (confirm("Czy na pewno chcesz usunąć użytkownika " + object.name + " " + object.surname + "?")) {
      console.log(object)
      this.apiService.deleteUser(object.id).subscribe(
        data => {
          console.log(data.status)
        }
      )
    }
    window.location.reload()
  }


  public showUsers() {
    this.isUsers = true;
    this.isUserForm = false;
    this.isUserEditForm = false;
  }

  public showAddNewUser() {
    this.isUsers = false;
    this.isUserForm = true;
    this.isUserEditForm = false;
  }

  public showEditUser() {
    this.isUsers = false;
    this.isUserForm = false;
    this.isUserEditForm = true;
  }



  public setLoginAndEmail() {
    let name = (this.userForm.controls.name.value).toLowerCase()
    let lastName = (this.userForm.controls.surname.value).toLowerCase()
    let login = name + "." + lastName
    if (name && lastName) {
      this.apiService.isLoginValid(login).subscribe(data => {
        this.userForm.controls.login.setValue(name + "." + lastName)
        this.userForm.controls.email.setValue(name + "." + lastName + "@")
        this.status = false
      },
        err => {
          this.status = true
          var login = name + "." + lastName
          this.apiService.isLoginValid(login + this.i.toString()).subscribe(data => {
            this.userForm.controls.login.setValue(login + this.i.toString())
            this.userForm.controls.email.setValue(name + "." + lastName + this.i.toString() + "@")
            this.status = false

          }, err => {
            this.i += 1
            console.log(this.i)
          })

        }

      )


    }

  }





  public userStyle() {

    var display: string
    if (!this.isUsers)
      display = 'none'
    else
      display = 'block'

    return display
  }

  public newUserStyle() {
    var display: string
    if (!this.isUserForm)
      display = 'none'
    else
      display = 'block'

    return display
  }

  public userEditStyle() {
    var display: string
    if (!this.isUserEditForm)
      display = 'none'
    else
      display = 'block'

    return display
  }


  public nameChange() {
    this.setLoginAndEmail()
  }

  public lastNameChange() {
    this.setLoginAndEmail()
  }
  clear() {

    this.userEditForm.controls.voivodeshipDto.reset()
    this.userEditForm.controls.countyDto.reset()
    this.userEditForm.controls.boroughDto.reset()
    this.userEditForm.controls.cityDto.reset()
    this.userEditForm.controls.streetDto.reset()
  }
  clear2() {
    this.userEditForm.controls.countyDto.reset()
    this.userEditForm.controls.boroughDto.reset()
    this.userEditForm.controls.cityDto.reset()
    this.userEditForm.controls.streetDto.reset()
  }

  clear3() {
    this.userEditForm.controls.boroughDto.reset()
    this.userEditForm.controls.cityDto.reset()
    this.userEditForm.controls.streetDto.reset()
  }

  clear4() {
    this.userEditForm.controls.cityDto.reset()
    this.userEditForm.controls.streetDto.reset()
  }

  clear5() {
    this.userEditForm.controls.streetDto.reset()
  }



  public voivodeshipPicked() {
    this.showCounties = true

    this.apiService.getCounty(this.userForm.controls.voivodeshipDto.value.id).subscribe(
      data => {
        this.counties = data

      }
    )
  }

  public voivodeshipPicked1() {
    this.showCounties = true

    this.apiService.getCounty(this.userEditForm.controls.voivodeshipDto.value.id).subscribe(
      data => {
        this.counties = data
      }
    )

  }


  public countyPicked() {
    this.showBoroughs = true


    this.apiService.getBorough(this.userForm.controls.countyDto.value.id).subscribe(
      data => {
        this.boroughs = data
      }
    )
  }

  public countyPicked1() {
    this.showBoroughs = true

    this.apiService.getBorough(this.userEditForm.controls.countyDto.value.id).subscribe(
      data => {
        this.boroughs = data
      }
    )
  }

  public boroughPicked() {
    this.showCities = true
    console.log(this.userForm.controls.boroughDto.value.id)
    console.log(this.userForm.controls.countyDto.value.id)
    this.apiService.getCity(this.userForm.controls.boroughDto.value.id).subscribe(
      data => {
        this.cities = data

      }
    )
  }

  public boroughPicked1() {
    this.showCities = true

    this.apiService.getCity(this.userEditForm.controls.boroughDto.value.id).subscribe(
      data => {
        this.cities = data

      }
    )
  }

  public cityPicked() {
    this.showStreets = true
    this.apiService.getStreet(this.userForm.controls.boroughDto.value.id).subscribe(
      data => {
        this.streets = data
        console.log(data)
      }
    )

  }

  public cityPicked1() {
    this.showStreets = true
    this.apiService.getStreet(this.userEditForm.controls.boroughDto.value.id).subscribe(
      data => {
        this.streets = data
        console.log(data)
      }
    )

  }

  public translatePermission(perName:string) {
   
    if (perName == "Dyplomant")
      return "STUDENT"
    else if(perName == "Promotor")
      return "LECTURER"
    else if(perName == "LECTURER")
      return "Promotor"
    else 
      return "Dyplomant"

  }


  public onSubmitUser() {
    this.userForm.controls.permission.setValue(this.translatePermission(this.userForm.controls.permission.value))
    console.log(this.userForm.value)
    console.log(this.userForm.controls.albumNumber.value)
    console.log(this.userForm.getRawValue())
    if(this.userForm.controls.streetDto.value == "")
      this.userForm.controls.streetDto.setValue(null)
    this.apiService.addUser(this.userForm.value).subscribe(
      data => {
        if (data.status == 200) {
          alert("Użytkownik został dodany!")
          this.apiService.getUser("LECTURER").subscribe(
            data => {
              this.dataSourceSupervisor = data
            }
          )
          this.apiService.getUser("STUDENT").subscribe(data => {
            this.dataSourceCandidate = data
          })
        }
        else
          alert("Coś poszło nie tak")
      }
    )
    this.userForm.reset()

  }

  public onSubmitUserEdit() {
    this.userEditForm.controls.permission.setValue(this.translatePermission(this.userEditForm.controls.permission.value))
    console.log(this.userEditForm.controls.login.value)
    


    console.log(this.userEditForm.value)
    this.apiService.editUser(this.userEditForm.getRawValue()).subscribe(
      data => {
        if (data.status == 200) {
          if(confirm("Użytkownik został zedytowany!"))
            window.location.reload()
          else
            window.location.reload()

          this.apiService.getUser("LECTURER").subscribe(
            data => {
              this.dataSourceSupervisor = data
            }
          )
          this.apiService.getUser("STUDENT").subscribe(data => {
            this.dataSourceCandidate = data
          })
          
        }
        else
          alert("Coś poszło nie tak")
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


  displayFn(object: any) {
    return object ? object.name : undefined
  }




  displayFnStreet(object: any) {
    if (object)
      return object.characteristic + " " + object.secondPart + " " + object.firstPart
    else
      return ""
  }




  ngOnInit(): void {
    this.userForm.controls.albumNumber.disable()

    this.apiService.getUser("LECTURER").subscribe(data => {
      this.dataSourceSupervisor = data
      console.log(this.dataSourceSupervisor)
    })

    this.apiService.getUser("STUDENT").subscribe(data => {
      this.dataSourceCandidate = data
      console.log(this.dataSourceCandidate)
    })


    this.filteredCountries = this.userForm.controls['countryDto'].valueChanges.pipe(
      startWith(''),
      map(country => country ? this._filter(country) : this.countries.slice())
    );

    this.filteredStreets = this.userForm.controls['streetDto'].valueChanges.pipe(
      startWith(''),
      map(street => street ? this._filterStreet(street) : this.streets.slice())
    );

    this.filteredVoivodeships = this.userEditForm.controls['voivodeshipDto'].valueChanges.pipe(
      startWith(''),
      map(voivodeship => voivodeship ? this._filterVoivodeship(voivodeship) : this.voivodeships.slice())
    );



/*
    this.filteredFaculties = this.userEditForm.controls['facultyDto'].valueChanges.pipe(
      startWith(''),
      map(faculty => faculty ? this._filterFaculty(faculty) : this.faculties.slice())
    );
*/
    this.filteredBoroughs = this.userEditForm.controls['boroughDto'].valueChanges.pipe(
      startWith(''),
      map(borough => borough ? this._filterBorough(borough) : this.boroughs.slice())
    );
    this.filteredCounties = this.userEditForm.controls['countyDto'].valueChanges.pipe(
      startWith(''),
      map(county => county ? this._filterCounty(county) : this.counties.slice())
    );
    this.filteredCities = this.userEditForm.controls['cityDto'].valueChanges.pipe(
      startWith(''),
      map(city => city ? this._filterCity(city) : this.cities.slice())
    );

    this.filteredStreets1 = this.userEditForm.controls['streetDto'].valueChanges.pipe(
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






  }



}
