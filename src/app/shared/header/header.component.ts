import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/components/login/login.component';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdminUser:boolean = false;
  constructor(private userService: UserService,
    private notify:NotificationService,
    private storage:StorageService,
    private route:Router){
  }
  ngOnInit(): void {
    this.userService.isAdmin$.subscribe(x=>{
      this.isAdminUser = x;
    })
  }

  openLogin() {
    this.userService.openPage(LoginComponent);
  }
  signOut(){
    this.userService.signOut();
    this.notify.showError("Logged out Successfully");
    this.route.navigate(['/home']);
  }
}

