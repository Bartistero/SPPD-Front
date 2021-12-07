import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatAlert } from '@lhn/mat-alert';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-theses',
  templateUrl: './theses.component.html',
  styleUrls: ['./theses.component.css']
})
export class ThesesComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  displayedColApprovedThesis: string[] = ['id',  'description', 'degreeCourseDto','lecturer', 'thesisName', 'thesisStatus', 'typeOfThesis', 'year','archive']
  dataSourceApprovedThesis: any
  displayedColArchivedThesis: string[] = ['id',  'description', 'degreeCourseDto','lecturer', 'thesisName', 'thesisStatus', 'typeOfThesis', 'year']
  dataSourceArchivedThesis: any
  displayedColThesis: string[] = ['id', 'reservation', 'description', 'lecturer', 'thesisName', 'thesisStatus', 'typeOfThesis', 'year', 'amountPeople', 'manage']
  dataSourceThesis: any
  constructor(private api: ApiService,private alert:MatAlert) { }
  public translateType(elem: any) {
    {
      switch (elem) {
        case "BACHELOR": return "Licencjacka"
        case "ENGINEERING": return "Inżynierska"
        case "MASTER": return "Magisterska"
        default: return "Doktorancka"
      }
    }
  }

  public translateStatus(elem: any) {
    {
      switch (elem) {
        case "ADDED_STUDENT": return "Dodana przez studenta"
        case "ACCEPTED_LECTURER": return "Zaakceptowana przez promotora"
        case "ADDED_LECTURER": return "Dodana przez promotora"
        case "RESERVED_STUDENT": return "Zarezerwowana przez studenta"
        case "ACCEPTED_FACULTY": return "Zatwierdzona"
        case "REJECTED": return "Odrzucona"
        default: return "archiwalna"

      }
    }
  }


  public accept(element: any) {
    if (confirm("Czy na pewno chcesz zaakceptować propozycję pracy: " + element.thesisName + " ?")) {
      element.thesisStatus = "ACCEPTED_FACULTY"
      this.api.updateThesis(element).subscribe(data => {
        if (data.status == 200) {
          this.alert.show('Sukces', 'zaakceptowano pracę!', {
            buttonText: 'Ok',
            buttonTheme: 'primary',
            raisedButton: true,
          })
          this.api.getAllThesis("ACCEPTED_LECTURER").subscribe(data => {
            this.dataSourceThesis = data.body
          })
        }
      }, err => {
        this.alert.show('Błąd', 'Coś poszło nie tak', {
          buttonText: 'Ok',
          buttonTheme: 'primary',
          raisedButton: true,
        })
      })
    }
    
  }

  public reject(element: any) {

    if (confirm("Czy na pewno chcesz odrzucić propozycję pracy: " + element.thesisName + " ?")) {
      element.thesisStatus = "REJECTED"
      this.api.updateThesis(element).subscribe(data => {
        console.log(data)
        if (data.status == 200)
        this.alert.show('Sukces', 'Odrzucono pracę!', {
          buttonText: 'Ok',
          buttonTheme: 'primary',
          raisedButton: true,
        })
        this.api.getAllThesis("ACCEPTED_LECTURER").subscribe(data => {
          this.dataSourceThesis = data.body
        })
      }, err => {
        this.alert.show('Błąd', 'Coś poszło nie tak', {
          buttonText: 'Ok',
          buttonTheme: 'primary',
          raisedButton: true,
        })
      })
    }
    

  }

  public archive(element: any){
    if (confirm("Czy na pewno chcesz archiwizować  prace: " + element.thesisName + " ?")) {
      element.thesisStatus = "ARCHIVED"
      this.api.updateThesis(element).subscribe(data => {
        console.log(data)
        if (data.status == 200)
        this.alert.show('Sukces', 'Praca zarchiwizowana!', {
          buttonText: 'Ok',
          buttonTheme: 'primary',
          raisedButton: true,
        })
        this.api.getAllThesis("ACCEPTED_LECTURER").subscribe(data => {
          this.dataSourceThesis = data.body
        })
      }, err => {
        this.alert.show('Błąd', 'Coś poszło nie tak', {
          buttonText: 'Ok',
          buttonTheme: 'primary',
          raisedButton: true,
        })
      })
    }
    
  }



  ngOnInit(): void {
    this.api.getAllThesis("ADDED_LECTURER").subscribe(data => {

      this.dataSourceThesis = new MatTableDataSource(data.body)
    
    }, err => {
      console.log(err)
    })

    this.api.getAllThesis("ACCEPTED_FACULTY").subscribe(data => {

      this.dataSourceApprovedThesis = new MatTableDataSource(data.body)
     
     
    },err=>{
      console.log(err)
    })

    this.api.getAllThesis("ARCHIVED").subscribe(data => {


      this.dataSourceArchivedThesis = new MatTableDataSource(data.body)
     
    },err=>{
      console.log(err)
    })

  }
  ngAfterViewInit() {
    this.dataSourceThesis.paginator = this.paginator.toArray()[0];


    this.dataSourceApprovedThesis.paginator = this.paginator.toArray()[1];

    this.dataSourceArchivedThesis.paginator = this.paginator.toArray()[2];




  }


}
