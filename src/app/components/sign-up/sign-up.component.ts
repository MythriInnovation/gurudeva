import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 
{Firestore,
collection,
addDoc,

}
from '@angular/fire/firestore'
import { FormBuilder, Validators } from '@angular/forms';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm:any;
  roles:any;
  constructor( private fauth:AngularFireAuth, 
    private fireStore:AngularFirestore,
    private storage:StorageService,
    private formBuilder: FormBuilder){
  }

  ngOnInit(): void {
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
      address: [''],
    });
  }

  onSubmit(){
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
        id:user.uid,
        email: user.email,
        firstName:userInformation.firstName,
        lastName:userInformation.lastName,
        address:userInformation.address,
        mobile:userInformation.mobile,
        designation:userInformation.designation,
        photoUrl:userInformation.firstName,
      }).then(() => {
        this.fireStore.collection('userRoles').doc(user.uid).set({

        })
        console.log('User information stored in Firestore successfully.');
      })
    });
  }

  // signUp(f:any){
  //   const collectionInstance = collection(this.fireStore,"users");
  //   addDoc(collectionInstance,f.value)
  //   .then(data=>{
  //     console.log("Data saved");
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   });
  // }

}
