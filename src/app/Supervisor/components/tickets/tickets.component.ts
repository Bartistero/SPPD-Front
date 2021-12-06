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
        this.dataSourceMyThesis = this.dataSourceMyThesis.filter((elem: { thesisStatus: string; }) => elem.thesisStatus == "ADDED_STUDENT")

      })
    },err=>{
      alert("Coś poszło nie tak")
    })
   }
    

  }

  public reject(elem: any){
    if(confirm("Czy na pewno chcesz odrzucić propozycję pracy: "+elem.thesisName+" ?"))
   {
    elem.thesisStatus = "REJECTED"
    this.api.updateThesis(elem).subscribe(data=>{
      console.log(data)
      if(data.status == 200)
      alert("Odrzucono prace!")
      this.api.getMyThesis().subscribe(data =>{
        this.dataSourceMyThesis = data.body
        this.dataSourceMyThesis = this.dataSourceMyThesis.filter((elem: { thesisStatus: string; }) => elem.thesisStatus == "ADDED_STUDENT")

      })
    },err=>{
      alert("Coś poszło nie tak")
    })
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
        case "REJECTED": return "Odrzucona"
        default : return "archiwalna"
        
      }
    }
  }

 

  ngOnInit(): void {
    this.api.getMyThesis().subscribe(data => {

      this.dataSourceMyThesis = data.body
      this.dataSourceMyThesis = this.dataSourceMyThesis.filter((elem: { thesisStatus: string; }) => elem.thesisStatus == "ADDED_STUDENT")
      console.log(this.dataSourceMyThesis)

    })

  }

}
