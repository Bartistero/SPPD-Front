import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-theses',
  templateUrl: './theses.component.html',
  styleUrls: ['./theses.component.css']
})
export class ThesesComponent implements OnInit {


  displayedColThesis: string[] = ['id', 'reservation', 'description', 'lecturer', 'thesisName', 'thesisStatus', 'typeOfThesis', 'year', 'amountPeople', 'manage']
  dataSourceThesis: any
  constructor(private api: ApiService) { }
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
          alert("Zaakceptowano prace!")
          this.api.getAllThesis("ACCEPTED_LECTURER").subscribe(data => {
            this.dataSourceThesis = data.body
          })
        }
      }, err => {
        alert("Coś poszło nie tak")
      })
    }
  }

  public reject(element: any) {

    if (confirm("Czy na pewno chcesz odrzucić propozycję pracy: " + element.thesisName + " ?")) {
      element.thesisStatus = "REJECTED"
      this.api.updateThesis(element).subscribe(data => {
        console.log(data)
        if (data.status == 200)
          alert("Odrzucono prace!")
        this.api.getAllThesis("ACCEPTED_LECTURER").subscribe(data => {
          this.dataSourceThesis = data.body
        })
      }, err => {
        alert("Coś poszło nie tak")
      })
    }

  }



  ngOnInit(): void {
    this.api.getAllThesis("ADDED_LECTURER").subscribe(data => {

      this.dataSourceThesis = data.body
      console.log(this.dataSourceThesis)
    }, err => {
      console.log(err)
    })

  }


}
