import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-building-assessment',
  templateUrl: './building-assessment.component.html',
  styleUrls: ['./building-assessment.component.sass']
})
export class BuildingAssessmentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(!localStorage.getItem('auth')){
      this.router.navigate(['/login'])
    }
  }

}

export default BuildingAssessmentComponent
