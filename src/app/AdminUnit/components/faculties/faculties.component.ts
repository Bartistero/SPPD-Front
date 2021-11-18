import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';
import { course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.css']
})
export class FacultiesComponent implements OnInit {
  public courseForm : any
  public editCourseForm : any
  public isCourse = true;
  public isCourseForm = false;
  public isCourseEditForm = false;
  public displayedColCourse: string[] = ['id','name','edit']
  public dataSourceCourse:any
  
  
    constructor(private apiService: ApiService) { 
    }
  
    public onSubmitCourse(){
      this.apiService.addCourse(this.courseForm.value).subscribe(data =>{
        alert("Dodano kierunek")
        this.apiService.getCourse().subscribe(
          data => {
              this.dataSourceCourse = data
          }
        )
      },err =>{
        alert("Coś poszło nie tak")
      })
      this.courseForm.reset()
    }
  
    public onSubmitEditCourse(){
      console.log(this.editCourseForm.value)
      this.apiService.editFaculty(this.editCourseForm.value).subscribe(data =>{
        alert("Zedytowano kierunek")
        this.apiService.getCourse().subscribe(
          data => {
              this.dataSourceCourse = data
          }
        )
      },err =>{
        alert("Coś poszło nie tak")
      })
      this.editCourseForm.reset()
      
    }
  
    public edit(course: course){
      this.showEditCourse()
      this.editCourseForm.controls.id.setValue(course.id)
      this.editCourseForm.controls.name.setValue(course.name)
      console.log(this.editCourseForm.value)
  
    }
  
    
  
  
    public showCourse() {
      this.isCourse = true;
      this.isCourseForm = false;
      this.isCourseEditForm = false;
    }
  
    public showAddNewCourse() {
      this.isCourse = false;
      this.isCourseForm = true;
      this.isCourseEditForm = false;
    }
  
    public showEditCourse() {
      this.isCourse = false;
      this.isCourseForm = false;
      this.isCourseEditForm = true;
    }
  
    public courseStyle()
    {
      var display = ''
      if(!this.isCourse) 
        display = 'none' 
      else
         display = 'block'
      return display
    }
  
    public newCourseStyle()
    {
      var display = ''
      this.isCourseForm ?   display = 'block' : display = 'none' 
      if(!this.isCourseForm) 
        display = 'none' 
      else
        display = 'block'
      return display  
    }
  
    public CourseEditStyle()
    {
      var display = ''
      if(!this.isCourseEditForm) 
        display = 'none' 
      else
         display = 'block'
      return display
    }
  
  
    ngOnInit(): void {
      this.courseForm = new FormGroup({
        name: new FormControl('',Validators.required),
      })
      this.editCourseForm = new FormGroup({
        id : new FormControl('',Validators.required),
        name: new FormControl('',Validators.required),
      })
  
      this.apiService.getCourse().subscribe(
        data => {
            this.dataSourceCourse = data
        }
      )
    }
  

}
