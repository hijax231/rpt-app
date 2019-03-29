import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('auth')){
      this.route.navigate(['/login'])
    }
  }

}

export default LandingPageComponent
