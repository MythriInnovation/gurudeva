import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { StorageService } from './services/storage.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'gurudeva';
  showLogin:boolean = false;
  dialogRef!:MatDialogRef<any>;
 constructor(private userService: UserService,
             private dialog: MatDialog,
             private storage:StorageService){
  }

  ngOnInit(): void {
    this.userService.getAllRoles().subscribe(roles=>{
      this.storage.AddRolesToStorage(roles);
    });

    this.userService.getCurrentUser();
    this.userService.openDialog$.subscribe(x=>{
      if(x != undefined)
      this.openSignUpComponent(x);
    })

    this.userService.closeDialog$.subscribe(x=>{
      if(x)
      this.closeSignUpComponent();
    })
  }

  openSignUpComponent(data:any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    // dialogConfig.width = '1000px';
    // dialogConfig.height = '300px';
    // dialogConfig.position = { top: '50%', left: '50%' };
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = 'my-dialog';
    dialogConfig.data = { key: data };
    this.dialogRef = this.dialog.open(SignUpComponent,dialogConfig);
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

  closeSignUpComponent(){
    this.dialogRef.close();
  }

  enableLogin(event:any){
    this.showLogin = event;
  }

}
