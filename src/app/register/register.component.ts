import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from '../classes/register';
import { register } from '../services/register.service';
import { SetAuthRoute } from '../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  public regForm: FormGroup;
  constructor(private reg: register, private auth: SetAuthRoute) { }

  ngOnInit() {
    if(localStorage.getItem('auth')){
      this.auth.alreadyAuth()
    }
    this.regForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      fName: new FormControl('', [Validators.required]),
      mName: new FormControl(''),
      lName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
    })
  }
  regist(form){
    if(this.regForm.valid){
      let data: RegisterUser = {
        username: form.username,
        password: form.password,
        name: {
          fName: form.fName,
          mName: form.mName,
          lName: form.lName,
        },
        address: form.address,
        contact: form.contact
      }
      return this.reg.registerNewUser(data).subscribe(res => {
        console.log(res)
      })
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.regForm.controls[controlName].hasError(errorName)
  }

}

export default RegisterComponent
