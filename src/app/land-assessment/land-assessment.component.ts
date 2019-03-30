import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-land-assessment',
  templateUrl: './land-assessment.component.html',
  styleUrls: ['./land-assessment.component.sass']
})
export class LandAssessmentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('auth')){
      this.router.navigate(['/login'])
    }
  }

}

export default LandAssessmentComponent
