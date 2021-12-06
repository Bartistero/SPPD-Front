import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  displayedColReport: string[] = ['supervisorsAmount', 'candidatesAmount', 'approvedAmount', 'lecturerAddedAmount', 'studentAddedAmount']
  dataSourceReport: any
  supervisors: any
  candidates: any
  approved: any
  lecturerAdeed:any
  studentAdded: any

  constructor() { }

  ngOnInit(): void {
    
  }

}
