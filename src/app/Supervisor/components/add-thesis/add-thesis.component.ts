import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-add-thesis',
  templateUrl: './add-thesis.component.html',
  styleUrls: ['./add-thesis.component.css']
})
export class AddThesisComponent implements OnInit {

  
  thesisTypes = ["Licencjacka","Inżynierska","Magisterska","Doktorancka"]
  supervisors:any
  addThesisForm = new FormGroup({
    thesisName: new FormControl('', Validators.required),
    typeOfThesis: new FormControl('', Validators.required),
    thesisStatus: new FormControl(''),
    description: new FormControl(''),
    amountPeople: new FormControl('',Validators.required),
    year: new FormControl(''),
    
    

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
    this.addThesisForm.controls.year.setValue({"id":1,"year":'2021'})
    this.addThesisForm.controls.year.setValue({"id":1,"year":'2021'})
  
    this.addThesisForm.controls.thesisStatus.setValue("ADDED_STUDENT")
    console.log(this.addThesisForm.value)
    this.api.proponeThesis(this.addThesisForm.value).subscribe(data =>{
      alert("Praca została dodana!")
      this.addThesisForm.reset()
    },err =>{
      alert("Cos poszlo nie tak")
      console.log(err)
      this.addThesisForm.reset()
    })

  }


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUser("LECTURER").subscribe(data =>{
      this.supervisors = data
      console.log(data)
    })
  }

}
