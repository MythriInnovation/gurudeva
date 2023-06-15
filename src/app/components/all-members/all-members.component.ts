import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.scss']
})
export class AllMembersComponent implements OnInit {
  members!:any[];
  currentPage = 1;
  pageSize = 5;
  isAdminUser:boolean = false;
  constructor(public userService: UserService){

  }
  ngOnInit(): void {
    this.getAllMembers();
    this.userService.isAdmin$.subscribe(x=>{
      this.isAdminUser = x;
    })
    // this.getProfileImage('mqmR8Z81aLYhC8m7bsM35X2EirJ2').subscribe(x=>{
    //   debugger;
    //   console.log(x);
    // })
  }

  editUser(member:any){
    debugger
    this.userService.openDialog$.next(member);
  }

  getProfileImage(userId:any){
    return this.userService.getImageByUserId(userId)
  }

  getAllMembers() {
    this.userService.getAllUsers().subscribe(users=>{
      this.members = users;
    })
    // this.userService.getImageByUserId
  }

  setPage(event:any){
      this.currentPage=event;
  }
}
