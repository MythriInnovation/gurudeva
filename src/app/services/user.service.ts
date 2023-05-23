import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, filter, map, of, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isAdminUser$:BehaviorSubject<boolean>  = new BehaviorSubject<boolean>(false);

  constructor(private modalService: NgbModal
    ,private fireStore:AngularFirestore,
    private  auth:AngularFireAuth,
    private storage:StorageService
    ) { }
  modalRef!: NgbModalRef;
  // users = [
  //   {
  //     id:1,
  //     firstName:"Adv.Krishnan",
  //     lastName:"S Raj",
  //     designation:"President",
  //     address:"Address 1",
  //     role:"admin",
  //     phoneNumber:"93434334342",
  //     image:'assets/images/guru.jpg'
  //   },
  //   {
  //     id:2,
  //     firstName:"Hirankumar",
  //     lastName:"A",
  //     designation:"Secratary",
  //     address:"Address 2",
  //     role:"admin",
  //     phoneNumber:"9497776923",
  //     image:'assets/images/guru.jpg'
  //   },
  //   {
  //     id:3,
  //     firstName:"Jayan",
  //     lastName:"A",
  //     designation:"Vice President",
  //     address:"Address 3",
  //     role:"admin",
  //     phoneNumber:"94977236923",
  //     image:'assets/images/guru.jpg'
  //   },
  //   {
  //     id:4,
  //     firstName:"Ajith",
  //     lastName:"A",
  //     designation:"Joint Secretary",
  //     address:"Address 4",
  //     role:"admin",
  //     phoneNumber:"94973236923",
  //     image:'assets/images/guru.jpg'
  //   },
  //   {
  //     id:5,
  //     firstName:"Adithyan",
  //     lastName:"CS",
  //     designation:"Treasurer",
  //     address:"Address 5",
  //     role:"admin",
  //     phoneNumber:"94973236923",
  //     image:'assets/images/guru.jpg'
  //   },
  //   {
  //     id:6,
  //     firstName:"BabuRaj",
  //     lastName:"A",
  //     designation:"",
  //     address:"Address 6",
  //     role:"user",
  //     phoneNumber:"94573236923",
  //     image:'assets/images/guru.jpg'
  //   },
  //   {
  //     id:7,
  //     firstName:"Vishnu",
  //     lastName:"A",
  //     designation:"",
  //     address:"Address 7",
  //     role:"user",
  //     phoneNumber:"94574236923",
  //     image:'assets/images/guru.jpg'
  //   }
  // ]
  getAllUsers():Observable<any>{
    return this.fireStore.collection('users').valueChanges();
  }

  getAllRoles():Observable<any>{
    return this.fireStore.collection('roles').valueChanges();
  }

  getAllUserRoles():Observable<any>{
    return this.fireStore.collection('userRoles').valueChanges();
  }

  getCurrentUser(): void {

    const curUser = this.storage.getCurrentUserFromStorage();
    if(!!curUser){
      debugger;
      this.updateAdminUser(curUser);
    }
    else{
      this.storage.removeSessionValues();
    }
  }

  public isAdmin$ = this.isAdminUser$.asObservable();

  updateAdminUser(user:any){
    this.getAllUserRoles().pipe(
      map(y=>y.filter((data:any)=>data.roleId === 2)),
    ).subscribe(x=>{
      this.isAdminUser$.next(x);
    })
  }

  openPage(content:any){
    this.modalRef = this.modalService.open(content);
  }
  closePage(){
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  signOut(){
    this.storage.removeSessionValues();
    this.isAdminUser$.next(false);
  }

  // getAdminUsers():Observable<any>{
  //   return of(this.users.filter(x=>x.role ==='admin'));
  // }
}
