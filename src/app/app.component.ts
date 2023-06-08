import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'gurudeva';
  showLogin:boolean = false;
 constructor(private userService: UserService,
             private storage:StorageService){
  }

  ngOnInit(): void {
    this.userService.getAllRoles().subscribe(roles=>{
      this.storage.AddRolesToStorage(roles);
    });

    // this.userService.getAllUserRoles().subscribe(userRoles=>{
    //   this.storage.AddUserRolesToStorage(userRoles);
    // });
    this.userService.getCurrentUser();

    // const curUser = this.storage.getCurrentUserFromStorage();
    // if(!!curUser)
    // this.userService.updateAdminUser(curUser);
  }

  enableLogin(event:any){
    this.showLogin = event;
  }

  // public open(modal: any): void {
  //   this.modalService.open(modal);
  // }
}
