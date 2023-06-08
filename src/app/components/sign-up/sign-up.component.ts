import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import 
{Firestore,
collection,
addDoc,

}
from '@angular/fire/firestore'
import { FormBuilder, Validators } from '@angular/forms';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  selectedFile!:any;
  signUpForm:any;
  roles:any;
  collectionData$:Observable<any> | undefined;
  constructor( private fauth:AngularFireAuth, 
    private fireStore:AngularFirestore,
    private notify:NotificationService,
    private fireStorage:AngularFireStorage,
    public userService:UserService,
    private storage:StorageService,
    private formBuilder: FormBuilder){
  }

  ngOnInit(): void {
    this.collectionData$ = this.userService.getAllRoles();
    this.selectedFile = undefined;
    this.roles=this.storage.getRolesFromStorage();
    debugger;
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required]],
      designation: [''],
      firstName: ['', [Validators.required]],
      lastName: [''],
      photoUrl: [''],
      role: ['0',[Validators.required]],
      address: [''],
    });
  }

  onSubmit(){
debugger;
    const rolevalue = this.signUpForm.get('role').value;
    let email = this.signUpForm.get('email').value;
    let password = this.signUpForm.get('password').value;
    const userInformation = {
      firstName:this.signUpForm.get('firstName').value,
      lastName:this.signUpForm.get('lastName').value,
      address:this.signUpForm.get('address').value,
      mobile:this.signUpForm.get('mobile').value,
      designation:this.signUpForm.get('designation').value,
      password:this.signUpForm.get('password').value,
      photoUrl:this.signUpForm.get('photoUrl').value,
    }

    this.fauth.createUserWithEmailAndPassword(email,password).then((credentials:any)=>{
      const user = credentials.user;
      this.fireStore.collection('users').doc(user.uid).set({
        firstName:userInformation.firstName,
        lastName:userInformation.lastName,
        address:userInformation.address,
        mobile:userInformation.mobile,
        designation:userInformation.designation,
      }).then(() => {
        this.fireStore.collection('userRoles').doc(user.uid).set({
          id:1,
          roleId:this.signUpForm.get('role').value
        }).then(()=>{
          this.uploadImage(user.uid);
        
          this.signUpForm.reset();
        })
        .catch(err=>{
          this.notify.showError(err.message);
        })  
      })
    });
  }

  selectImage(event: any) {
   this.selectedFile = event.target.files[0];
  }

  uploadImage(userId:any){
    const filePath = `user-profiles/${userId}`;
    const task =  this.fireStorage.upload(filePath, this.selectedFile)
      .then(()=>{
        this.notify.showSuccess('Registration completed successfully.');
    }).catch(err=>{
      this.notify.showError(err.message);
    });
  }


}
