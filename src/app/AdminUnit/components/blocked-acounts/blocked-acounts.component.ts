import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-blocked-acounts',
  templateUrl: './blocked-acounts.component.html',
  styleUrls: ['./blocked-acounts.component.css']
})
export class BlockedAcountsComponent implements OnInit {
  displayedColBlockedAccounts: string[] = ['id', 'name', 'surname','userName','accountStatus','unlock']
  dataSourceBlockedAccounts: any

  public unlock(elem: any){
    if(confirm("Czy na pewno chcesz odblokować konto użytkonika "+elem.name+" "+elem.surname+"?"))
      this.api.unlockAccount(elem).subscribe(data =>{
        if(data.status == 200)
          alert("Konto zostało odblokowane!")
      },
      err=> {
        alert("Cos poszło nie tak!")
      })

  }

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getBlockedAccounts().subscribe(data=>{
      
      this.dataSourceBlockedAccounts = data
      console.log(this.dataSourceBlockedAccounts)
    })

  }

}
