import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatAlert } from '@lhn/mat-alert';
import jwtDecode from 'jwt-decode';

import { ApiService } from 'src/app/_services/api.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-theses-list',
  templateUrl: './theses-list.component.html',
  styleUrls: ['./theses-list.component.css']
})
export class ThesesListComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  displayedColListOfThesis: string[] = ['id', 'reservation', 'description', 'lecturer', 'thesisName', 'thesisStatus', 'typeOfThesis', 'year','amountPeople','save',]
  dataSourceListOfThesis: any
  students:any
  public status = "ADDED_LECTURER"
  public status2 = "ADDED_STUDENT"
  dataSourceMyThesis: any
  constructor(private api: ApiService, private jwt:TokenStorageService, private alert:MatAlert) { }
  public translateType(elem:any){
    {
      switch(elem){
        case "BACHELOR": return "Licencjacka"
        case "ENGINEERING": return "Inżynierska"
        case "MASTER": return "Magisterska"
        default : return "Doktorancka"
      }
    }
  }

  public translateStatus(elem:any){
    {
      switch(elem){
        case "ADDED_STUDENT": return "Dodana przez studenta"
        case "ACCEPTED_LECTURER": return "Zaakceptowana przez promotora"
        case "ADDED_LECTURER": return "Dodana przez promotora"
        case "RESERVED_STUDENT": return "Zarezerwowana przez studenta"
        case "ACCEPTED_FACULTY": return "Zatwierdzona"
        default : return "Archiwalna"
        
      }
    }
  }

  public save(element:any){
    var student = {
      "id":this.students[0].id,
      "name":this.students[0].name,
      "surname":this.students[0].surname
    }
    if(confirm("Czy na pewno chcesz zapisać się na prace "+element.thesisName+" ?"))
      {
        this.api.saveOnThesis(student,element.id).subscribe(data=>{
          if(data.status == 200)
          {
            this.alert.show('Sukces', 'Zapisano na pracę!', {
              buttonText: 'Ok',
              buttonTheme: 'primary',
              raisedButton: true,
            })
            this.api.getAllThesis("ACCEPTED_LECTURER").subscribe(data => {
              this.dataSourceListOfThesis = data.body
             
            });
          }

        },err=>{
          this.alert.show('Błąd', 'Coś poszło nie tak', {
            buttonText: 'Ok',
            buttonTheme: 'primary',
            raisedButton: true,
          })
        })
      }
  }

 

  ngOnInit(): void {
    
    
    this.api.getAllThesis("ACCEPTED_LECTURER").subscribe(data => {
      this.dataSourceListOfThesis = new MatTableDataSource(data.body)
      
    });

    this.api.getUser("STUDENT").subscribe(data=>{
      this.students = data
      this.students = this.students.filter((person: { login: any; }) => person.login == this.jwt.getUser())
      console.log(this.students)
      
    })

  }

  ngAfterViewInit() {
    this.dataSourceListOfThesis.paginator = this.paginator.toArray()[0];

  }
}