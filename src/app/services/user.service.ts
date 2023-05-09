import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAllUsers():Observable<any>{
    let users = [
      {
        id:1,
        firstName:"Adv.Krishnan",
        lastName:"S Raj",
        designation:"President",
        address:"Address 1",
        phoneNumber:"93434334342",
      },
      {
        id:2,
        firstName:"Hirankumar",
        lastName:"A",
        designation:"Secratary",
        address:"Address 2",
        phoneNumber:"9497776923",
      },
      {
        id:3,
        firstName:"Jayan",
        lastName:"A",
        designation:"Vice President",
        address:"Address 3",
        phoneNumber:"94977236923",
      },
      {
        id:4,
        firstName:"Ajith",
        lastName:"A",
        designation:"Joint Secretary",
        address:"Address 4",
        phoneNumber:"94973236923",
      },
      {
        id:5,
        firstName:"Adithyan",
        lastName:"CS",
        designation:"Treasurer",
        address:"Address 5",
        phoneNumber:"94973236923",
      }
    ]

    return of(users);
  }
}
