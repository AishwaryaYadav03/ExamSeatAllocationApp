import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private readonly service: AdminService){}

  blocks:any[] = []

  seatAllocation:any[] = []
  isAllocated = false

  ngOnInit(): void {
    this.service.getAllBlocks().subscribe(res=>{
      if(res!==null){
        this.blocks = res
      }
    })
    this.checkRemainingSeats();
  }

  checkRemainingSeats(){
    this.blocks.map(s=>{
      this.seatAllocation = s.seatAllocations
      if(this.seatAllocation.length == 0){
        this.isAllocated = false;
        
      }
      else{
        this.isAllocated = true;
      }
    })
  }

}
