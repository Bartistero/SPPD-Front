import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { voivodeship } from 'src/app/shared/models/voivodeship';
import { county } from 'src/app/shared/models/county';





@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.css']
})


export class AdministratorsComponent implements OnInit {
  public voivodeships: voivodeship[]= []
  public counties: county[]= []
  public showCounties = false
  
  constructor(private apiService: ApiService) { }

  adminForm = new FormGroup({
    adminName: new FormControl('',Validators.required),
    voivodeship: new FormControl(''),
    county: new FormControl('')

  })

 

  public voivodeshipPicked(){
    this.showCounties = true
    
    this.apiService.getCounty(this.adminForm.controls.voivodeship.value.id).subscribe(
      data => {
        this.counties = data
          console.log(this.voivodeships)
          
        }
      )

    
  }

  ngOnInit(): void {
    
    
    this.apiService.getVoivodeship().subscribe(
    data => {
      this.voivodeships = data
        console.log(this.voivodeships)
        
      }
    )
  }

}
