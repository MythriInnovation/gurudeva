import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.scss']
})
export class AllMembersComponent implements OnInit {
  members!:any[];
  currentPage = 1;
  pageSize = 5;
  constructor(private userService: UserService){

  }
  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers() {
    this.userService.getAllUsers().subscribe(users=>{
      this.members = users;
    })
  }

  setPage(event:any){
      this.currentPage=event;
  }

}
