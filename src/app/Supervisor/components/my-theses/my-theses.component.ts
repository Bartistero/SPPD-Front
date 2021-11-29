import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-my-theses',
  templateUrl: './my-theses.component.html',
  styleUrls: ['./my-theses.component.css']
})
export class MyThesesComponent implements OnInit {
  displayedColMyThesis: string[] = ['id', 'collaborator', 'description', 'lecturer', 'thesisName', 'thesisStatus', 'typeOfThesis', 'year','amountPeople']
  dataSourceMyThesis: any
  constructor(private api: ApiService) { }


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
        default : return "archiwalna"
        
      }
    }
  }

  ngOnInit(): void {
    this.api.getMyThesis().subscribe(data => {

      this.dataSourceMyThesis = data.body
      console.log(this.dataSourceMyThesis)
    })

  }

}
