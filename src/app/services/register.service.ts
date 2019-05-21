import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUser } from '../classes/register';

@Injectable({
  providedIn: 'root'
})

export class register {

  constructor(private httpClient: HttpClient) { }

  registerNewUser(data: RegisterUser): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    let opt = { headers: headers }
    return this.httpClient.post('http://192.168.100.24:5000/api/register', data, opt)
  }
}
