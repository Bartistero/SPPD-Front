import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-approved-theses',
  templateUrl: './approved-theses.component.html',
  styleUrls: ['./approved-theses.component.css']
})
export class ApprovedThesesComponent implements OnInit {

  displayedColApprovedThesis: string[] = ['id', 'collaborator', 'description', 'lecturer', 'thesisName', 'thesisStatus', 'typeOfThesis', 'year','amountPeople']
  dataSourceApprovedThesis: any
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

  public RemoveElementFromArray(status: string) {
    this.dataSourceApprovedThesis.forEach((value: { thesisStatus: string; },index: any)=>{
        if(value.thesisStatus!=status) this.dataSourceApprovedThesis.splice(index);
    });
}

  ngOnInit(): void {
    this.api.getAllThesis().subscribe(data => {

      this.dataSourceApprovedThesis = data.body
      this.RemoveElementFromArray("ACCEPTED_FACULTY")
      console.log(this.dataSourceApprovedThesis)
    },err=>{
      console.log(err)
    })

  }

}




