import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-thesis',
  templateUrl: './add-thesis.component.html',
  styleUrls: ['./add-thesis.component.css']
})
export class AddThesisComponent implements OnInit {
  constructor(private api: ApiService,private jwt: TokenStorageService) { }
  public years: any
  public degrees: any
  public year = new Date().getFullYear()
  public year2 = new Date().getFullYear()+1
  public joinedYear = this.year.toString()+'/'+this.year2.toString()
  
  thesisTypes = ["Licencjacka","Inżynierska","Magisterska","Doktorancka"]
  supervisors:any
  addThesisForm = new FormGroup({
    thesisName: new FormControl('', Validators.required),
    typeOfThesis: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    degreeCourseDto: new FormControl('', Validators.required),
    thesisStatus: new FormControl(''),
    lecturer: new FormControl(''),
    description: new FormControl(''),
    amountPeople: new FormControl('',Validators.required),
    
    
    

  })

  public tranlateType(str: string)
  {
    switch(str){
      case "Licencjacka": return "BACHELOR"
      case "Inżynierska": return "ENGINEERING"
      case "Magisterska": return "MASTER"
      default : return "DOCTORAL"
    }
  }

  public addThesisSubmit(){
    this.addThesisForm.controls.typeOfThesis.setValue(this.tranlateType(this.addThesisForm.controls.typeOfThesis.value))
    this.addThesisForm.controls.lecturer.setValue({"id":this.supervisors[0].id,"name":this.supervisors[0].name,"surname":this.supervisors[0].surname})
   
  
    this.addThesisForm.controls.thesisStatus.setValue("ADDED_LECTURER")
    console.log(this.addThesisForm.value)
    this.api.proponeThesis(this.addThesisForm.getRawValue()).subscribe(data =>{
      alert("Praca została dodana!")
      this.addThesisForm.reset()
    },err =>{
      alert("Cos poszlo nie tak")
      console.log(err)
      this.addThesisForm.reset()
    })

  }

  public RemoveElementFromArray(login: string) {
    this.supervisors.forEach((value: { login: string; },index: any)=>{
        if(value.login!=login) this.supervisors.splice(index);
    });

  }

 

  ngOnInit(): void {
    

    this.api.getYear().subscribe(data =>{
      this.years = data.body
      this.years = this.years.filter((year: { year: string; }) => year.year == this.joinedYear);
      this.addThesisForm.controls.year.setValue(this.years[0])
      this.addThesisForm.controls.year.disable()

      

  })

    this.api.getCourse().subscribe(data =>{
      this.degrees = data
    })
    

    this.api.getUser("LECTURER").subscribe(data =>{
      this.supervisors = data
    
    this.supervisors = this.supervisors.filter((supervisor: { login: any; }) => supervisor.login == this.jwt.getUser())
      console.log(this.supervisors)
    })
  }

}
