import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-propone-thesis',
  templateUrl: './propone-thesis.component.html',
  styleUrls: ['./propone-thesis.component.css']
})
export class ProponeThesisComponent implements OnInit {
  public years: any
  public degrees: any
  public year = new Date().getFullYear()
  public year2 = new Date().getFullYear()+1
  public joinedYear = this.year.toString()+'/'+this.year2.toString()

  thesisTypes = ["Licencjacka","Inżynierska","Magisterska","Doktorancka"]
  supervisors:any
  proponeForm = new FormGroup({
    thesisName: new FormControl('', Validators.required),
    typeOfThesis: new FormControl('', Validators.required),
    lecturer: new FormControl('', Validators.required),
    thesisStatus: new FormControl(''),
    year: new FormControl('', Validators.required),
    degreeCourseDto: new FormControl('', Validators.required),
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

  public proponeSubmit(){
    this.proponeForm.controls.typeOfThesis.setValue(this.tranlateType(this.proponeForm.controls.typeOfThesis.value))
    this.proponeForm.controls.lecturer.setValue({
      "id": this.proponeForm.controls.lecturer.value.id,
      "name": this.proponeForm.controls.lecturer.value.name,
      "surname": this.proponeForm.controls.lecturer.value.surname
    })
    this.proponeForm.controls.thesisStatus.setValue("ADDED_STUDENT")
    console.log(this.proponeForm.value)
    this.api.proponeThesis(this.proponeForm.getRawValue()).subscribe(data =>{
      alert("Praca została dodana!")
      this.proponeForm.reset()
    },err =>{
      alert("Cos poszlo nie tak")
      this.proponeForm.reset()
    })

  }


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUser("LECTURER").subscribe(data =>{
      this.supervisors = data
      console.log(data)
    })
  

  this.api.getYear().subscribe(data =>{
    this.years = data.body
    this.years = this.years.filter((year: { year: string; }) => year.year == this.joinedYear);
      this.proponeForm.controls.year.setValue(this.years[0])
      this.proponeForm.controls.year.disable()
    
  })

  this.api.getCourse().subscribe(data =>{
    this.degrees = data
  })

}
}
