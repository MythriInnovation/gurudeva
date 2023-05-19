import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import {ToastrService} from 'ngx-toastr'
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  name!: string;
  email!: string;
  message!: string;

  constructor(private notify:NotificationService){

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.notify.showSuccess('Thank you, We have received your message.')
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
