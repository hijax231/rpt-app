import { Component, OnInit } from '@angular/core';
import { Credentials } from '../classes/cred';
import { login } from '../services/login.service';
import { loginAuthRes } from '../classes/login';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  authRes = new loginAuthRes();
  public loginForm: FormGroup;

  constructor(private auth: login) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  login(form) {
    if(this.loginForm.valid){
      let data: Credentials = {
        username: form.username,
        password: form.password
      }
      return this.auth.authenticateUser(data).subscribe(res => {
        this.authRes.success = res.success;
        this.authRes.status = res.status;
        this.authRes.token = res.token;
        console.log(this.authRes)
      })
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

}

export default LoginComponent
