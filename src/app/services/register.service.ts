import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUser } from '../classes/register';

@Injectable({
  providedIn: 'root'
})

export class register {

  constructor(private httpClient: HttpClient){}

  registerNewUser(data: RegisterUser): Observable<any> {
    return this.httpClient.post('http://localhost:5000/register', data)
  }
}
