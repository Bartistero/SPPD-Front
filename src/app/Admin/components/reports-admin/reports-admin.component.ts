import { Component, OnInit } from '@angular/core';
import { report } from 'src/app/shared/models/report';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-reports-admin',
  templateUrl: './reports-admin.component.html',
  styleUrls: ['./reports-admin.component.css']
})
export class ReportsAdminComponent implements OnInit {

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
    this.api.getCountUsers("LECTURER").subscribe(data => {
      this.supervisors = data
      this.dataSourceReport[0].supervisorsAmount = this.supervisors
    })

    this.api.getCountUsers("STUDENT").subscribe(data => {
      this.candidates = data
      console.log(this.candidates)
      this.dataSourceReport[0].candidatesAmount = this.candidates
    })

    this.api.getCountThesis("ACCEPTED_FACULTY").subscribe(data => {
      this.approved = data
      this.dataSourceReport[0].approvedAmount = this.approved
    })

    this.api.getCountThesis("ADDED_LECTURER").subscribe(data =>{
      this.lecturerAdded = data
      this.dataSourceReport[0].lecturerAddedAmount = this.lecturerAdded
    })

    this.api.getCountThesis("ACCEPTED_LECTURER").subscribe(data =>{
      this.studentAdded = data
      console.log(data)
      this.dataSourceReport[0].studentAddedAmount = this.studentAdded
    })
    



  }
  

}
