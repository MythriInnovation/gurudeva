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
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { Inject } from '@angular/core';

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
  mobileNumberRegx = '/^[6-9]\d{9}$/'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fauth:AngularFireAuth, 
    private fireStore:AngularFirestore,
    private notify:NotificationService,
    private fireStorage:AngularFireStorage,
    public userService:UserService,
    private storage:StorageService,
    private formBuilder: FormBuilder){
  }

  ngOnInit(): void {
    debugger;
    this.collectionData$ = this.userService.getAllRoles();
    this.selectedFile = undefined;
    this.roles=this.storage.getRolesFromStorage();
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
      designation: [''],
      firstName: ['', [Validators.required]],
      lastName: ['',[Validators.required]],
      photoUrl: [''],
      role: ['0',[this.requiredSelectValidator()]],
      address: ['',[Validators.required]],
    },{ validator: this.passwordMatchValidator()});
  }

  get allFormControls(){
    return this.signUpForm.controls;
  }

  closeSignUp(event:any){
    this.userService.closeDialog$.next(true);
  }

  onSubmit(){
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

  requiredSelectValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedValue = control.value;
      
      // Check if the selected value is empty or null
      if (!selectedValue || selectedValue === '0') {
        return { 'required': true };
      }
      
      return null; // Return null if the value is valid
    };
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');  
      // Check if both password and confirm password controls have values
      if (password && confirmPassword &&
        password.value && confirmPassword.value && password.value !== confirmPassword.value) {
        // Return an error object with a 'passwordMismatch' key
        return { 'passwordMismatch': true };
      }
  
      return null; // Return null if passwords match
    };
  }


}
