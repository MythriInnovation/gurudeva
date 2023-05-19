import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private modalService: NgbModal) { }
  modalRef!: NgbModalRef;
  users = [
    {
      id:1,
      firstName:"Adv.Krishnan",
      lastName:"S Raj",
      designation:"President",
      address:"Address 1",
      role:"admin",
      phoneNumber:"93434334342",
      image:'assets/images/guru.jpg'
    },
    {
      id:2,
      firstName:"Hirankumar",
      lastName:"A",
      designation:"Secratary",
      address:"Address 2",
      role:"admin",
      phoneNumber:"9497776923",
      image:'assets/images/guru.jpg'
    },
    {
      id:3,
      firstName:"Jayan",
      lastName:"A",
      designation:"Vice President",
      address:"Address 3",
      role:"admin",
      phoneNumber:"94977236923",
      image:'assets/images/guru.jpg'
    },
    {
      id:4,
      firstName:"Ajith",
      lastName:"A",
      designation:"Joint Secretary",
      address:"Address 4",
      role:"admin",
      phoneNumber:"94973236923",
      image:'assets/images/guru.jpg'
    },
    {
      id:5,
      firstName:"Adithyan",
      lastName:"CS",
      designation:"Treasurer",
      address:"Address 5",
      role:"admin",
      phoneNumber:"94973236923",
      image:'assets/images/guru.jpg'
    },
    {
      id:6,
      firstName:"BabuRaj",
      lastName:"A",
      designation:"",
      address:"Address 6",
      role:"user",
      phoneNumber:"94573236923",
      image:'assets/images/guru.jpg'
    },
    {
      id:7,
      firstName:"Vishnu",
      lastName:"A",
      designation:"",
      address:"Address 7",
      role:"user",
      phoneNumber:"94574236923",
      image:'assets/images/guru.jpg'
    }
  ]
  getAllUsers():Observable<any>{
    return of(this.users);
  }

  openPage(content:any){
    this.modalRef = this.modalService.open(content);
  }
  closePage(){
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  getAdminUsers():Observable<any>{
    return of(this.users.filter(x=>x.role ==='admin'));
  }
}
