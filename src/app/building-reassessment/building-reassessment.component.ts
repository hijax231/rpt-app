import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-building-reassessment',
  templateUrl: './building-reassessment.component.html',
  styleUrls: ['./building-reassessment.component.sass']
})
export class BuildingReassessmentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('auth')) {
      this.router.navigate(['/login'])
    }
  }

}

export default BuildingReassessmentComponent
