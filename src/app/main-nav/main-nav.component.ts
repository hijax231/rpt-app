import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from  '@angular/router'
import * as jwt_decode from 'jwt-decode'

export interface Nav {
  route: string;
  text: string;
}

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private route: Router) {}

  navs: Nav[] = [
    { route: '/user/' + this.getUser() + '/assessments', text: 'Assessments'},
    { route: '/user/' + this.getUser() + '/reassessments', text: 'Reassessments' }
  ]

  getUser() {
    if(localStorage.getItem('auth')){
      let token = jwt_decode(localStorage.getItem('auth'))
      console.log(token.username)
      return token.username
    }
  }

  nonAuth() {
    return localStorage.getItem('auth') == null
  }

  loggedIn(){
    return localStorage.getItem('auth') != null
  }

  logOut(){
    localStorage.removeItem('auth')
    window.location.href = '/'
  }

}
