import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../classes/cred';

@Injectable({
  providedIn: 'root'
})

export class login{
  constructor(private httpClient: HttpClient){}

  authenticateUser(data: Credentials): Observable<any> {
    return this.httpClient.post('http://localhost:5000/login', data)
  }

}
