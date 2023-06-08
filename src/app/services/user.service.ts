import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, filter, map, of, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from './storage.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';


export class Role
{
  id:string | undefined;
  name:string | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isAdminUser$:BehaviorSubject<boolean>  = new BehaviorSubject<boolean>(false);
  constructor(private modalService: NgbModal,
    public fireStorage:AngularFireStorage,
    private fireStore:AngularFirestore,
    private  auth:AngularFireAuth,
    private storage:StorageService
    ) { }
  modalRef!: NgbModalRef;
  storagePath:string = "user-profiles";
  
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
    return this.fireStore.collection('users').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          const imageUrl = this.getImageByUserId(id);
          return { id, data,imageUrl };
        });
      }));
  }

  // getAdminUsers():Observable<any>{
  //   return this.fireStore.collection('users').snapshotChanges().pipe(
  //     map(actions => {
  //       return actions.map(a => {
  //         const data = a.payload.doc.data()
  //         const id = a.payload.doc.id;
  //         const imageUrl = this.getImageByUserId(id);
  //         return { id, data,imageUrl };
  //       })
  //     }));
  // }

  getImageByUserId(userId:any):Observable<any>{
    const filePath = `${this.storagePath}/${userId}`;
    return this.fireStorage.ref(filePath).getDownloadURL();
  }

  getAllUserRoles(userId:any):Observable<any>{
    return this.fireStore.collection('userRoles').snapshotChanges().pipe(
      map(actions=>{
        return actions.filter(x=>
          x.payload.doc.id == userId
        )
      }),
      map(x=>{
       return  x.map(y=>
        {
          const id = y.payload.doc.id;
          const data = y.payload.doc.data();
          return {id:id,data:data}
        })
        })
      )
  }

  getAllRoles() {
    let collectionRef = this.fireStore.collection<any>('roles');
    return  collectionRef.snapshotChanges().pipe(
      map(actions=>actions.map(x=>{
        const roleId = x.payload.doc.id;
        const data = x.payload.doc.data();
        return {roleId:roleId,data:data}
      }))
    );
  }

  checkAdminUser(user:any){
    this.getAllUserRoles(user.uid).subscribe(x=>{
      const roles = this.storage.getRolesFromStorage();
      const adminRoleId = roles?.filter((x:any)=>x.data.name === 'admin')[0]?.roleId;
      if(x.length >=0 && adminRoleId === x[0]?.data.roleId){
        this.isAdminUser$.next(true);
      }
    })
  }

  getCurrentUser(): void {
    const curUser = this.storage.getCurrentUserFromStorage();
    if(!!curUser){
      this.checkAdminUser(curUser);
    }
    else{
      this.storage.removeSessionValues();
    }
  }

  public isAdmin$ = this.isAdminUser$.asObservable();

  uploadProfileImage(imageFile:any,userId:any){
    const filePath = 'users';
    const storageRef = this.fireStorage.ref(filePath);
    const imageRef = storageRef.child('users/' + userId + '/profile.jpg');
    const task = imageRef.put(imageFile);
    return task.snapshotChanges;
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
}
