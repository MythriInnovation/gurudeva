import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.scss']
})
export class AllMembersComponent implements OnInit {
  members!:any[];
  page = 1;
  pageSize = 4;
  constructor(private http: HttpClient){

  }
  ngOnInit(): void {
    this.members = [
      {
        firstName: 'Adv.Krishnan',
        lastName: 'S Raj',
        image: 'https://via.placeholder.com/350x350',
        address:"Address1",
        mobile: "947878776923",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan scelerisque velit, vel pretium nisi convallis eget.'
      },
      {
        firstName: 'Hirankumar',
        lastName: 'A',
        image: 'https://via.placeholder.com/350x350',
        address:"Kailas",
        mobile: "9497776923",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan scelerisque velit, vel pretium nisi convallis eget.'
      },
      {
        firstName: 'Jayan',
        lastName: 'A',
        image: 'https://via.placeholder.com/350x350',
        address:"Address2",
        mobile: "94977734523",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan scelerisque velit, vel pretium nisi convallis eget.'
      },
      {
        firstName: 'Jayan',
        lastName: 'A',
        image: 'https://via.placeholder.com/350x350',
        address:"Address2",
        mobile: "94977734523",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan scelerisque velit, vel pretium nisi convallis eget.'
      },
      {
        firstName: 'Jayan',
        lastName: 'A',
        image: 'https://via.placeholder.com/350x350',
        address:"Address2",
        mobile: "94977734523",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan scelerisque velit, vel pretium nisi convallis eget.'
      },
      {
        firstName: 'Jayan',
        lastName: 'A',
        image: 'https://via.placeholder.com/350x350',
        address:"Address2",
        mobile: "94977734523",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan scelerisque velit, vel pretium nisi convallis eget.'
      },
      {
        firstName: 'Jayan',
        lastName: 'A',
        image: 'https://via.placeholder.com/350x350',
        address:"Address2",
        mobile: "94977734523",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan scelerisque velit, vel pretium nisi convallis eget.'
      },
      {
        firstName: 'Jayan',
        lastName: 'A',
        image: 'https://via.placeholder.com/350x350',
        address:"Address2",
        mobile: "94977734523",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan scelerisque velit, vel pretium nisi convallis eget.'
      },
      {
        firstName: 'Jayan',
        lastName: 'A',
        image: 'https://via.placeholder.com/350x350',
        address:"Address2",
        mobile: "94977734523",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan scelerisque velit, vel pretium nisi convallis eget.'
      },
  
    ];
  }

  getMembers() {
    return this.members.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }
  
 
  

}
