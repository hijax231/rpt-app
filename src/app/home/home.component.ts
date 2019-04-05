import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
		if(localStorage.getItem('auth')) {
			window.location.href = '/user/' + (jwt_decode(localStorage.getItem('auth'))).username
		}
  }

}

export default HomeComponent
