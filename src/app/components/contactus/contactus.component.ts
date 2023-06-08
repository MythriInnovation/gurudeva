import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import {ToastrService} from 'ngx-toastr'
import { MailService } from 'src/app/services/mail.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  name!: string;
  email!: string;
  message!: string;

  constructor(private notify:NotificationService,private mail:MailService){

  }

  ngOnInit(): void {
  }

  onSubmit() {
    debugger;
    this.mail.sendEmail('sd','sdfd','sdfdsf');
    this.notify.showSuccess('Thank you, We have received your message.')
    this.name = '';
    this.email = '';
    this.message = '';
  }

  
}
