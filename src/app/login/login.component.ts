import { Component, OnInit } from '@angular/core';
import { Credentials } from '../classes/cred';
import { login } from '../services/login.service';
import { loginAuthRes } from '../classes/login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit{
  response = {};
  constructor(private auth: login) { }

  ngOnInit() {

  }
  login(form) {
    let input = form.value
    var data = new Credentials();
    data.username = input.username;
    data.password = input.password;
    return this.auth.authenticateUser(data).subscribe(res => {
      console.log(res)
      this.response.status = res.success;
      this.response.success = res.errors;
      this.response.token = res.token;
    })
  }

}

export default LoginComponent
