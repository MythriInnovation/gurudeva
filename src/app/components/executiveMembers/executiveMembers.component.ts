import { Component, OnInit } from '@angular/core';
import { Observable, filter, flatMap, map, mergeMap, of, pipe } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-executiveMembers',
  templateUrl: './executiveMembers.component.html',
  styleUrls: ['./executiveMembers.component.scss']
})
export class ExecutiveMembersComponent implements OnInit {
  allMembers:any[]  = []
  constructor(private userService:UserService,private storage:StorageService){
    
  }
  ngOnInit(): void {
    this.userService.getAllUsersWithRoles().subscribe(x=>{
        x.isAdmin && this.allMembers?.push(x);
    })
    // this.userService.getAllUsers().pipe(
    //   map((users:any)=>{
    //     return of(users).pipe(
    //       map(user=>{
    //         debugger;
    //         return user;
    //       })
    //     )
    //   }
    // ),
    // flatMap((user:any)=>{
    //   return this.userService.getAllUserRoles(user.id).pipe(
    //     map(userRoles=>{
    //       debugger;
    //       const roles = this.storage.getRolesFromStorage();
    //       const adminRoleId = roles?.
    //             filter((x:any)=>x.data.name === 'admin')[0]?.
    //             roleId;
    //       return (userRoles.length >0 && userRoles[0].
    //             data.roleId === adminRoleId); 
    //     })
    //   )
    // }
    // )).subscribe(x=>{
    //   debugger;
    // })
  }
 
  
}
