import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { report } from 'src/app/shared/models/report';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  displayedColReport: string[] = ['supervisorsAmount', 'candidatesAmount', 'approvedAmount', 'lecturerAddedAmount', 'studentAddedAmount']
  dataSourceReport: Array<report> =[{supervisorsAmount:0,
  candidatesAmount:0,
  approvedAmount:0,
  lecturerAddedAmount:0,
  studentAddedAmount:0
  }]
  supervisors: any
  candidates: any
  approved: any
  lecturerAdded: any
  studentAdded: any

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUser("LECTURER").subscribe(data => {
      this.supervisors = data
      this.dataSourceReport[0].supervisorsAmount = this.supervisors.length
    })

    this.api.getUser("STUDENT").subscribe(data => {
      this.candidates = data
      console.log(this.candidates)
      this.dataSourceReport[0].candidatesAmount = this.candidates.length
    })

    this.api.getAllThesis("ACCEPTED_FACULTY").subscribe(data => {
      this.approved = data.body
      this.dataSourceReport[0].approvedAmount = this.approved.length
    })

    this.api.getAllThesis("ADDED_LECTURER").subscribe(data =>{
      this.lecturerAdded = data.body.filter((elem: { thesisStatus: string; }) => elem.thesisStatus == "ADDED_LECTURER")
      this.studentAdded = data.body.filter((elem: { thesisStatus: string; }) => elem.thesisStatus == "ACCEPTED_LECTURER")
      this.dataSourceReport[0].lecturerAddedAmount = this.lecturerAdded.length
      this.dataSourceReport[0].studentAddedAmount = this.studentAdded.length
      
      
    })
    



  }
  
  
}
