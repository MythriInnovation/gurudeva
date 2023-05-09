import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  allMembers:any | undefined
  constructor(private userService:UserService){
    
  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users=>{
      this.allMembers = users;
    })
  }
 
  
}
