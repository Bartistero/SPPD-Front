import { Component, OnInit } from '@angular/core';
import { MatAlert } from '@lhn/mat-alert';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-blocked-acounts',
  templateUrl: './blocked-acounts.component.html',
  styleUrls: ['./blocked-acounts.component.css']
})
export class BlockedAcountsComponent implements OnInit {
  displayedColBlockedAccounts: string[] = ['id', 'name', 'surname', 'userName', 'unlock']
  dataSourceBlockedAccounts: any

  public unlock(elem: any) {
    console.log(elem)
    elem.accountStatus = "DISABLE"
    if (confirm("Czy na pewno chcesz odblokować konto użytkownika " + elem.name + " " + elem.surname + "?")) {
      this.api.unlockAccount(elem).subscribe(data => {
        if (data.status == 200) {
          this.alert.show('Sukces', 'Odblokowano konto!', {
            buttonText: 'Ok',
            buttonTheme: 'primary',
            raisedButton: true,
          })
        }
        this.api.getBlockedAccounts().subscribe(data =>{
          this.dataSourceBlockedAccounts = data
        })

      },
        err => {
          this.alert.show('Błąd', 'Coś poszło nie tak', {
            buttonText: 'Ok',
            buttonTheme: 'primary',
            raisedButton: true,
          })
        })
    }


  }

  constructor(private api: ApiService,private alert:MatAlert) { }

  ngOnInit(): void {
    this.api.getBlockedAccounts().subscribe(data => {

      this.dataSourceBlockedAccounts = data
      console.log(this.dataSourceBlockedAccounts)
    })

  }

}
