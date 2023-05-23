import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-executiveMembers',
  templateUrl: './executiveMembers.component.html',
  styleUrls: ['./executiveMembers.component.scss']
})
export class ExecutiveMembersComponent implements OnInit {
  allMembers:any | undefined
  constructor(private userService:UserService){
    
  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users=>{
      debugger;
      this.allMembers = users;
    })
  }
 
  
}
