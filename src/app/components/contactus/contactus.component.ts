import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  name!: string;
  email!: string;
  message!: string;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 

  onSubmit() {
    alert(`Thank you, ${this.name}! We have received your message.`);
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
