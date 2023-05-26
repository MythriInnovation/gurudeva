import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { RecaptchaVerifier } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  password: string = '';
  showPassword: boolean = false;
  recaptchaVerifier!: RecaptchaVerifier;
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(
      private fauth:AngularFireAuth,
      private userService:UserService,
      private notify:NotificationService,
      private fb: FormBuilder,
      private router:Router,
      private notification:NotificationService,
      private storage:StorageService
    ){
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;
    this.fauth.signInWithEmailAndPassword(email,password).then((data:any)=>{
      debugger;
      this.storage.AddUserToStorage(data.user);
      this.userService.checkAdminUser(data.user);
      this.notify.showSuccess("Logged in Successfully");
      this.userService.closePage();
      this.router.navigate(['/home']);
    },err=>{
        this.notify.showError(err.message);
     })
  }
}
