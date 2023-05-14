import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbCarousel, NgbModal, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/components/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private modalService: NgbModal){

  }
  openLogin() {
    debugger;
    this.modalService.open(LoginComponent);
  }




}

