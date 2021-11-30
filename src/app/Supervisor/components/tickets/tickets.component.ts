import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  displayedColMyThesis: string[] = ['id', 'collaborator', 'description', 'lecturer', 'thesisName', 'thesisStatus', 'typeOfThesis', 'year','amountPeople','manage']
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

  public accept(elem: any){
   if(confirm("Czy na pewno chcesz zaakceptować propozycję pracy?"))
   {
    elem.thesisStatus = "ACCEPTED_LECTURER"
    this.api.updateThesis(elem).subscribe(data=>{
      if(data.status == 200)
      alert("Zaakceptowano prace!")
      this.api.getMyThesis().subscribe(data =>{
        this.dataSourceMyThesis = data.body
        this.RemoveElementFromArray("ADDED_STUDENT")
      })
    },err=>{
      alert("Coś poszło nie tak")
    })
   }
    

  }

  public reject(elem: any){

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
    this.dataSourceMyThesis.forEach((value: { thesisStatus: string; },index: any)=>{
        if(value.thesisStatus!=status) this.dataSourceMyThesis.splice(index);
    });
}

  ngOnInit(): void {
    this.api.getMyThesis().subscribe(data => {

      this.dataSourceMyThesis = data.body
      this.RemoveElementFromArray("ADDED_STUDENT")
      console.log(this.dataSourceMyThesis)

    })

  }

}
