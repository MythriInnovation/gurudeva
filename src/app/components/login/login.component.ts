import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private fauth:AngularFireAuth, 
    private userService:UserService,
    private notify:NotificationService,
     private fb: FormBuilder,
     private router:Router,
     private notification:NotificationService){
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    this.fauth.signInWithEmailAndPassword(this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value).then(()=>{
      this.notify.showSuccess("Logged in Successfully");
      this.userService.closePage();
      this.router.navigate(['/home']);
    },err=>{
        this.notify.showError(err.message);
     })
  }
}
