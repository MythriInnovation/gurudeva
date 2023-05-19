import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import 
{Firestore,
collection,
addDoc,

}
from '@angular/fire/firestore'
import { FormBuilder } from '@angular/forms';
import { createUserWithEmailAndPassword } from '@firebase/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm:any;
  constructor(private auth:Auth, private fireStore:Firestore,private formBuilder: FormBuilder){
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
  }

  signUp(f:any){
    createUserWithEmailAndPassword(this.auth,"","").then(x=>{

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
