import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gurudeva';
  showLogin:boolean = false;
  constructor() {
  }

  enableLogin(event:any){
    debugger;
    this.showLogin = event;
  }

  // public open(modal: any): void {
  //   this.modalService.open(modal);
  // }
}
