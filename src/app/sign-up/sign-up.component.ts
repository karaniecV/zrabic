import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup
  passwordFormGroup: FormGroup

  constructor(private _formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.nameFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required]
    });
    this.emailFormGroup = this._formBuilder.group({
      
      emailCtrl: ['', Validators.required]
    });
    this.passwordFormGroup = this._formBuilder.group({
      
      passwordCtrl: ['', Validators.required]
    });
  }

  onSignUp(){
    this.authService.onSignUp(this.emailFormGroup.value.emailCtrl, this.passwordFormGroup.value.passwordCtrl).subscribe(data=>{
      if(data){
        this.router.navigate([''])
      }
    })
  }

  getErrorMessage() {
    if (this.emailFormGroup.controls.emailCtrl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailFormGroup.controls.emailCtrl.hasError('email') ? 'Not a valid email' : '';
  }

  


}
 