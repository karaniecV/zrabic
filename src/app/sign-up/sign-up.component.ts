import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  nameFormGroup: FormGroup;
  emailFormGroup: FormGroup
  passwordFormGroup: FormGroup

  constructor(private _formBuilder: FormBuilder, private authService: AuthService) { }

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
    this.authService.onSignUp(this.emailFormGroup.value.emailCtrl, this.passwordFormGroup.value.passwordCtrl).subscribe()
    console.log('this.passwordFormGroup.value', this.passwordFormGroup.value.passwordCtrl)
    console.log('this.emailFormGroup.value', this.emailFormGroup.value.emailCtrl)

  }

  getErrorMessage() {
    // console.log(this.emailFormGroup)
    if (this.emailFormGroup.controls.emailCtrl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailFormGroup.controls.emailCtrl.hasError('email') ? 'Not a valid email' : '';
  }

  


}
 