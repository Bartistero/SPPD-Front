import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-blocked-acounts',
  templateUrl: './blocked-acounts.component.html',
  styleUrls: ['./blocked-acounts.component.css']
})
export class BlockedAcountsComponent implements OnInit {
  displayedColBlockedAccounts: string[] = ['id', 'name', 'surname','login', 'unlock']
  dataSourceBlockedAccounts: any

  public unlock(elem: any){

  }

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getBlockedAccounts().subscribe(data=>{
      this.dataSourceBlockedAccounts = data
    })

  }

}
