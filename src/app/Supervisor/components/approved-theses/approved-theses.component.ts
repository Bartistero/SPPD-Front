import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-approved-theses',
  templateUrl: './approved-theses.component.html',
  styleUrls: ['./approved-theses.component.css']
})
export class ApprovedThesesComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  displayedColApprovedThesis: string[] = ['id',  'description','degreeCourseDto', 'lecturer', 'thesisName', 'thesisStatus', 'typeOfThesis', 'year','amountPeople']
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

  ngOnInit(): void {
    this.api.getAllThesis("ACCEPTED_FACULTY").subscribe(data => {

      this.dataSourceApprovedThesis = new MatTableDataSource(data.body)
   
      
    },err=>{
      console.log(err)
    })

  }

  ngAfterViewInit() {
    this.dataSourceApprovedThesis.paginator = this.paginator.toArray()[0];

  }

}




