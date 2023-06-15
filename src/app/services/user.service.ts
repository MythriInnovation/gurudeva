import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, filter, flatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from './storage.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignUpComponent } from '../components/sign-up/sign-up.component';


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
  public openDialog$:BehaviorSubject<any>  = new BehaviorSubject<any>(undefined);
  public closeDialog$:BehaviorSubject<boolean>  = new BehaviorSubject<boolean>(false);
  constructor(private modalService: NgbModal,
    private dialog: MatDialog,
    public fireStorage:AngularFireStorage,
    private fireStore:AngularFirestore,
    private  auth:AngularFireAuth,
    private storage:StorageService
   ) { }
  modalRef!: NgbModalRef;
 
  storagePath:string = "user-profiles";

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

  getAllUsersWithRoles():Observable<any>{
    return this.fireStore.collection('users').snapshotChanges().pipe(
       flatMap(actions=>{
          return actions.map((a:any)=>{
          const id=a.payload.doc.id;
          const data=a.payload.doc.data();
          const userRoles = this.getAllUserRoles(id);
          const roles = this.storage.getRolesFromStorage();
          const adminRoleId = roles?.filter((x:any)=>x.data.name === 'admin')[0]?.roleId;
          return {
            id,adminRoleId,userRoles,data
          };
        })
      }),
      flatMap((next:any)  =>{
        const userId = next.id
        const adminRoleId = next.adminRoleId;
        const userData = next.data;
        const usrInfo =  next.userRoles.pipe(
          map((x:any)=>{
            const isAdmin = (x.length > 0 && x[0].data.roleId === adminRoleId);
            const imageUrl = this.getImageByUserId(userId);
            const data = {
              userId,imageUrl,userData,isAdmin
            } 
            return data;
          })
        )
        return usrInfo;
      }),
    )
  }
  openDialog(data:any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1200px';
    dialogConfig.height = '300px';
    dialogConfig.position = { top: '50%', left: '50%' };
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = data;
    dialogConfig.backdropClass = 'my-dialog';
    const dialogRef = this.dialog.open(SignUpComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

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

  isAdminUser(user:any){
    this.getAllUserRoles(user.uid).pipe
    (map(x=>{
      const roles = this.storage.getRolesFromStorage();
      const adminRoleId = roles?.filter((x:any)=>x.data.name === 'admin')[0]?.roleId;
      return (x.length >=0 && adminRoleId === x[0]?.data.roleId)
      
    }))
  }

  getAllAdminUsers():Observable<any>{
    return this.getAllUsers().pipe(
      mergeMap((user:any)=>{
        debugger
        return this.getAllUserRoles(user.id).pipe(
          map((y:any)=>{
            const roles = this.storage.getRolesFromStorage();
            const adminRoleId = roles?.
                  filter((x:any)=>x.data.name === 'admin')[0]?.
                  roleId;
            return (y.length >0 && y[0].
                  data.roleId === adminRoleId); 
          }),
        )
      })
    )
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
