import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faculty } from 'src/app/shared/models/faculty';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
public facultyForm : any
public editFacultyForm : any
public isFaculty = true;
public isFacultyForm = false;
public isFacultyEditForm = false;
public displayedColFaculty: string[] = ['id','name','edit']
public dataSourceFaculty:any


  constructor(private apiService: ApiService) { 
  }

  public onSubmitFaculty(){
    this.apiService.addFaculty(this.facultyForm.value).subscribe(data =>{
      alert("Dodano wydzial")
      this.apiService.getFaculty().subscribe(
        data => {
            this.dataSourceFaculty = data
        }
      )
    },err =>{
      alert("Coś poszło nie tak")
    })
    this.facultyForm.reset()
  }

  public onSubmitEditFaculty(){
    console.log(this.editFacultyForm.value)
    this.apiService.editFaculty(this.editFacultyForm.value).subscribe(data =>{
      alert("Zedytowano wydzial")
      this.apiService.getFaculty().subscribe(
        data => {
            this.dataSourceFaculty = data
        }
      )
    },err =>{
      alert("Coś poszło nie tak")
    })
    this.editFacultyForm.reset()
    
  }

  public edit(faculty: faculty){
    this.showEditFaculty()
    this.editFacultyForm.controls.id.setValue(faculty.id)
    this.editFacultyForm.controls.name.setValue(faculty.name)
    console.log(this.editFacultyForm.value)

  }

  


  public showFaculty() {
    this.isFaculty = true;
    this.isFacultyForm = false;
    this.isFacultyEditForm = false;
  }

  public showAddNewFaculty() {
    this.isFaculty = false;
    this.isFacultyForm = true;
    this.isFacultyEditForm = false;
  }

  public showEditFaculty() {
    this.isFaculty = false;
    this.isFacultyForm = false;
    this.isFacultyEditForm = true;
  }

  public facultyStyle()
  {
    var display = ''
    if(!this.isFaculty) 
      display = 'none' 
    else
       display = 'block'
    return display
  }

  public newFacultyStyle()
  {
    var display = ''
    this.isFacultyForm ?   display = 'block' : display = 'none' 
    if(!this.isFacultyForm) 
      display = 'none' 
    else
      display = 'block'
    return display  
  }

  public FacultyEditStyle()
  {
    var display = ''
    if(!this.isFacultyEditForm) 
      display = 'none' 
    else
       display = 'block'
    return display
  }


  ngOnInit(): void {
    this.facultyForm = new FormGroup({
      name: new FormControl('',Validators.required),
    })
    this.editFacultyForm = new FormGroup({
      id : new FormControl('',Validators.required),
      name: new FormControl('',Validators.required),
    })

    this.apiService.getFaculty().subscribe(
      data => {
          this.dataSourceFaculty = data
      }
    )
  }

}
